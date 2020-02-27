const database = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
};
  
module.exports = database;
  