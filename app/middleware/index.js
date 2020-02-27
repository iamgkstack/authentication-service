/**
 * middleware stack for our Koa app
 */

const bodyParser = require('koa-bodyparser');
const responseTime = require('./responseTime');
const logger = require('./logger');
const cors = require('./cors');

module.exports = app => {
  app.use(responseTime);
  app.use(cors);
  app.use(logger);
  app.use(bodyParser());
};
