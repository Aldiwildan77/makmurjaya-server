const { DATABASE, NODE_ENV } = require('../config/config')
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
  POOL_SIZE
} = DATABASE

function _sequelizeLog(query) {
  if (NODE_ENV === 'development') {
    try {
      fs.appendFileSync(path.normalize('./logs/') + 'sql.log', (query + "\n"), 'utf8')
    } catch (error) {
      throw error
    }
  }
}

const conn = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: NODE_ENV === 'development' ? _sequelizeLog : false,
  pool: {
    min: 1,
    max: POOL_SIZE,
    acquire: 30000,
    idle: 1000
  },
  operatorAliases: false
})

module.exports = conn