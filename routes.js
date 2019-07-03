const routes = require('next-routes')

module.exports = routes()
  .add('about-me', '/about/me', 'about')
  .add('post-modal', '/post/:id', 'index');
