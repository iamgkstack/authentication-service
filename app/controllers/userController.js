const models = require('../models');
const { comparePassword } = require('../utils');

module.exports = {
  me: async (ctx, next) => {
    try {
      ctx.body = await models.user.findOne({ username: ctx.options.username });
      return next();
    } catch (e) {
      return ctx.throw(500, `${e} occured`);
    }
  },

  signup: async (ctx, next) => {
      console.log('models =>', models.user);
    const { username, password, email } = ctx.request.body;

    if (!(username && email && password)) {
      // return a personalised message if username is provided
      return ctx.throw(400, `all fields are mandatory ${username || ''}`);
    }

    let userData;
    let tokenData;

    try {
      userData = await models.user.create({ username, email, password });
    } catch (e) {
      return ctx.throw(500, `creating user failed! :( ${e}`, e);
    }

    try {
      tokenData = await models.accessToken.create({ username });
    } catch (e) {
      return ctx.throw(500, `creating accessToken failed! :( ${e}`);
    }

    ctx.body = {
      accessToken: tokenData.token,
      username: userData.username,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    };

    ctx.status = 201;
    return next();
  },

  signin: async (ctx, next) => {
    const { username, password } = ctx.request.body;

    if (!(username && password)) {
      return ctx.throw(400, `all fields are mandatory ${username || ''}`);
    }

    try {
      const userRecord = await models.user.findOne({ where: { username } });
      // if user is not registered
      if (!userRecord) {
        ctx.status = 401;
        ctx.body = { message: `${username} is not registered. Please signup` };
        return next();
      }

      // validate the password
      const isValidPassword = await comparePassword(
        password,
        userRecord.password
      );

      // if password is invalid
      if (!isValidPassword) {
        ctx.status = 401;
        ctx.body = {
          message: `password doesn't match, ${username}, please retry with correct password`
        };
        return next();
      }

      // return a new accessToken
      const tokenData = await models.accessToken.create({ username });

      ctx.body = {
        accessToken: tokenData.token,
        username: userRecord.username,
        email: userRecord.email,
        createdAt: userRecord.createdAt,
        updatedAt: userRecord.updatedAt
      };

      ctx.status = 200;

      return next();
    } catch (e) {
      return ctx.throw(500, `some error occured :( ${e}`);
    }
  }
};
