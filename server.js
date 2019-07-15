const { join } = require('path');
const { parse } = require('url');
const fastify = require('fastify')({});
const Next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

fastify.register(require('fastify-compress'));

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["reply"] }] */

fastify.register((fastify, options, next) => {
  const app = Next({ dev });

  app
    .prepare()
    .then(() => {
      fastify.get('/sw.js', (request, reply) => {
        return app
          .serveStatic(
            request.req,
            reply.res,
            join(__dirname, '.next', 'sw.js')
          )
          .then(() => {
            reply.sent = true;
          });
      });

      fastify.get('/precache-manifest.*.js', (request, reply) => {
        const { pathname } = parse(request.req.url, true);
        return app
          .serveStatic(
            request.req,
            reply.res,
            join(__dirname, '.next', pathname)
          )
          .then(() => {
            reply.sent = true;
          });
      });

      fastify.get('/*', (request, reply) => {
        return app.handleRequest(request.req, reply.res).then(() => {
          reply.sent = true;
        });
      });

      next();
    })
    .catch((err) => next(err));
});

fastify.listen(port, (err) => {
  if (err) throw err;
  console.log(`>🚀 Ready on http://localhost:${port}`);
});
