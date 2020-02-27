const authRouter = require('./routes');

module.exports = app => {
  app.use(authRouter.routes());
  app.use(authRouter.allowedMethods());
};
