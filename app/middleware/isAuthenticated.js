const { getToken } = require('../utils');
const models = require('../models');

/**
 * Since this service provides public API,
 * we allow user who is also not authenticated.
 * For the admin routes, we add this policy/middleware
 */

module.exports = async (ctx, next) => {
  const token = getToken(ctx);

  if (!token) {
    return ctx.throw(401, 'Access Token is missing');
  }

  try {
    const user = await models.accessToken.findOne({
      token,
      include: [{ model: models.user }]
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User is not found' };
      return next();
    }

    ctx.options = {
      user: {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };

    return next();
  } catch (e) {
    return ctx.throw(500, `${e} occured`);
  }
};
