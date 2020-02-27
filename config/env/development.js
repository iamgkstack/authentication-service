const database = {
    host: 'localhost',
    port: 5432,
    database: 'authenticationservice',
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
};
  
module.exports = database;