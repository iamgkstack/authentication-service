const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const dBConfig = require('../../config');

const db = {};
let sequelize;

if (dBConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dBConfig.use_env_variable]);
} 
else {
  sequelize = new Sequelize(
    dBConfig.database,
    dBConfig.username,
    dBConfig.password,
    dBConfig
  );
}

fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(`./${file}`);
    console.log('DBFile =>', file);
    console.log('DBModel =>', model);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize

module.exports = db;
