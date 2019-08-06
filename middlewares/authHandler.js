const jwt = require('jsonwebtoken')
const { AUTH_TOKEN } = require('../config/config')
const { Karyawan } = require('../models')

const auth = async (req, res, next) => {

  req.state = { scope: [] }

  try {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (authHeader && authHeader.length > 0) {
      const [type, token] = authHeader.split(' ')
      if (!/^Bearer$/i.test(type)) {
        res.status(401)
        res.json({
          error: 'Wrong token format'
        })
      }

      const gtoken = jwt.verify(token, AUTH_TOKEN)
      req.state = {
        ...req.state,
        ...gtoken,
        "isLogin": true
      }
    }

    await next()
  } catch (error) {
    next(error)
  }
}

module.exports = { auth }