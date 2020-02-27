const { urls, constants } = require('../../config');
const { getToken } = require('../utils');
const request = require('request-promise-native');

/**
 * Middleware that adds user object to
 * the context if it finds an accessToken
 * in the context header.
 * It also sets the user type
 */
module.exports = async (ctx, next) => {
  const accessToken = getToken(ctx);
  // start with setting user to UNAUTHENTICATED
  ctx.user = { type: constants.USER_UNAUTHENTICATED };

  // no accessToken (and not a service account)
  // go forward as UNAUTHENTICATED user
  if (!accessToken) return next();

  const options = {
    method: 'GET',
    uri: `${urls.api}/auth/v1/me`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  };

  try {
    const body = await request(options);

    ctx.user = body;
    ctx.user.type = ctx.user.isAdmin
      ? constants.USER_ADMIN
      : constants.USER_AUTHENTICATED;
  } catch (err) {
    const { statusCode, error: { message } } = err;
    ctx.throw(statusCode, message);
  }

  return next();
};
