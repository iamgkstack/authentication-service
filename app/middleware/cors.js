const { constants } = require('../../config');

/**
 * Sets various Access-Control-Allow-* on the response
 */
module.exports = async (ctx, next) => {
  await next();

  ctx.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': constants.ALLOWED_ORIGINS,
    'Access-Control-Allow-Headers': constants.ALLOWED_HEADERS,
    'Access-Control-Allow-Methods': constants.ALLOWED_METHODS,
    Allow:
      'ACL,BIND,CHECKOUT,CONNECT,COPY,DELETE,GET,HEAD,LINK,LOCK,M-SEARCH,MERGE,MKACTIVITY,MKCALENDAR,MKCOL,MOVE,NOTIFY,PATCH,POST,PROPFIND,PROPPATCH,PURGE,PUT,REBIND,REPORT,SEARCH,SUBSCRIBE,TRACE,UNBIND,UNLINK,UNLOCK,UNSUBSCRIBE'
  });
};
