const { DATABASE } = require('../config/config')
const Sequelize = require('sequelize')
const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
  POOL_SIZE
} = DATABASE

const conn = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
  pool: {
    min: 1,
    max: POOL_SIZE,
    acquire: 30000,
    idle: 1000
  }, 
  operatorAliases: false
})

module.exports = conn