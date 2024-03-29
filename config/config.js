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

const MAILER = {
  HOST: process.env.SMTP_HOST,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASS: process.env.SMTP_PASS
}

const USER_TYPE = {
  ADMIN: 'admin',
  KASIR: 'kasir'
}

const SCOPE_ADMIN = [
  'isAdmin',
  'verifyEmail',
  'karyawan',
  'karyawanLogin',
  'karyawanRegister',
  'addCart',
  'updateCart',
  'deleteCart',
  'addCartDetail',
  'updateCartDetail',
  'deleteCartDetail',
  'jabatanGrant',
  'pelangganGrant',
  'supplierGrant',
  'satuanGrant',
  'kategoriGrant',
  'barangGrant',
  'stokGrant'
]

const SCOPE_KASIR = [
  'isKasir',
  'verifyEmail',
  'karyawanLogin',
  'karyawanRegister',
  'addCart',
  'updateCart',
  'deleteCart',
  'addCartDetail',
  'updateCartDetail',
  'deleteCartDetail',
  'stokGrant'
]

const DATABASE = database
const AUTH_TOKEN = process.env.AUTH_TOKEN

module.exports = {
  NODE_ENV,
  DATABASE,
  AUTH_TOKEN,
  USER_TYPE,
  MAILER,
  SCOPE_ADMIN,
  SCOPE_KASIR
}