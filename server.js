const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const vhost = require('vhost');
const routes = require('./routes');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

function renderAndCache (req, res) {
  if (ssrCache.has(req.url)) {
    return res.send(ssrCache.get(req.url));
  }

  // Match route + parse params
  const { route, params } = routes.match(req.url);
  if (!route) return handle(req, res);
  
  app.renderToHTML(req, res, route.page, params).then((html) => {
    ssrCache.set(req.url, html);
    res.send(html);
  })
     .catch((err) => {
       app.renderError(err, req, res, route.page, params)
     })
}


app.prepare().then(() => {
  express().use(renderAndCache).listen(process.env.APP_PORT)
})
