require('dotenv').config()
const NODE_ENV = process.env.NODE_ENV
let database

// default set to production
switch (NODE_ENV) {
  case 'development':
    database = {
      DB_HOST: 'localhost',
      DB_NAME: 'makmurjaya',
      DB_USER: 'root',
      DB_PASS: '',
      DB_PORT: 3306,
      DB_DIALECT: 'mysql',
      POOL_SIZE: 5
    }
    break;
  case 'test':
    database = {
      DB_HOST: 'localhost',
      DB_NAME: 'makmurjaya',
      DB_USER: 'root',
      DB_PASS: '',
      DB_PORT: 3306,
      DB_DIALECT: 'mysql',
      POOL_SIZE: 5
    }
    break;
  default:
    database = {
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASS: process.env.DB_PASS,
      DB_PORT: process.env.DB_PORT,
      DB_DIALECT: 'mysql',
      POOL_SIZE: 10
    }
    break;
}

const DATABASE = database
const AUTH_TOKEN = process.env.AUTH_TOKEN

module.exports = {
  NODE_ENV,
  DATABASE,
  AUTH_TOKEN
}