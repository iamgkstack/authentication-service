const { hashPassword } = require('../utils');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'user'],
            allowNull: false,
            defaultValue: 'user'
        }
    },
    {
        hooks: {
          beforeCreate: user =>
            hashPassword(user).then(hash => {
              user.password = hash; // eslint-disable-line no-param-reassign
            })
        }
    });
    User.associate = models => {
        models.user.hasMany(models.accessToken);
    };
    return User;
};