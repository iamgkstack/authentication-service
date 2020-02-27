const bcrypt = require('bcrypt');
const config = require('../../config');

module.exports = {
  hashPassword: user => bcrypt.hash(user.password, config.bcrypt.rounds),

  comparePassword: (plaintextPassword, hash) =>
    new Promise((resolve, reject) =>
      bcrypt.compare(
        plaintextPassword,
        hash,
        (err, isValid) => (err ? reject(err) : resolve(isValid))
      )
    ),

  getToken: ctx => {
    let token;

    if (typeof ctx.query.access_token === 'string') {
      token = ctx.query.access_token;
    }

    if (typeof ctx.headers.authorization === 'string') {
      token = ctx.headers.authorization.split(' ')[1];
    }

    return token;
  }
};
