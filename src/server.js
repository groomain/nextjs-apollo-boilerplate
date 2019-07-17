const { setConfig } = require('next/config');
setConfig(require('../next.config'));

const compression = require('compression');
const express = require('express');
const path = require('path');
const next = require('next');
const { parse } = require('url');

const nextI18NextMiddleware = require('next-i18next/middleware').default;

const port = parseInt(process.env.PORT, 10) || 3000;
const nextI18next = require('./lib/NextI18Next');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: './src',
  port,
});

const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));
  server.use(compression());
  server.use((req, res, cb) => {
    res.removeHeader('x-powered-by');
    cb();
  });

  // Serve static files
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);

    const rootStaticFiles = [
      '/precache-manifest',
      '/sw.js',
      '/robots.txt',
      '/sitemap.xml',
    ];

    if (rootStaticFiles.includes(parsedUrl.pathname)) {
      const staticPath = path.join(__dirname, 'static', parsedUrl.pathname);

      app.serveStatic(req, res, staticPath);
    } else {
      handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> 🚀 Ready on http://localhost:${port}`);
  });
});
