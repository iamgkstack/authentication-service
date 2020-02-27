const { constants } = require('../../../config');

module.exports = (ctx, next) => {
  if (ctx.headers.authorization === constants.USER_AUTHENTICATED) {
    ctx.user = {
      username: 'johndoe',
      type: constants.USER_AUTHENTICATED
    };
    return next();
  }

  if (ctx.headers.authorization === constants.USER_UNAUTHENTICATED) {
    ctx.user = { type: constants.USER_UNAUTHENTICATED };
    return next();
  }

  if (ctx.headers.authorization === constants.USER_ADMIN) {
    ctx.user = { type: constants.USER_ADMIN };
    return next();
  }

  return ctx.throw(400, {
    message: 'please set headers as defined in constants'
  });
};
