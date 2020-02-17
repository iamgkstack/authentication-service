const Koa = require('koa');
const routes = require('./routes');
const middleware = require('./middleware');

/**
 * initiate a Koa app
 * @type {Koa}
 */

 const app = new Koa();
 middleware(app);
 routes(app);

 module.exports = app;
 