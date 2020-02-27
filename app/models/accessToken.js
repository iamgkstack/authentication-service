const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('accessToken', {
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: function defaultValue() {
        return crypto
          .randomBytes(48)
          .toString('base64')
          .replace(/\//g, '_')
          .replace(/\+/g, '-');
      }
    }
  });

  AccessToken.associate = models => {
      console.log('models =>', models);
    models.accessToken.belongsTo(models.user);
  };
  return AccessToken;
};
