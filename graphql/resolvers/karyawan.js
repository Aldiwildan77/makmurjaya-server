const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../models')
const { AUTH_TOKEN, USER_TYPE } = require('../../config/config')

const login = async (username, password) => {
  try {
    let userExists = await db.models.Karyawan.findOne({ where: { username } })
    if (!userExists) {
      throw new Error('User isn\'t exist')
    }

    const isEqual = await bcrypt.compare(password, userExists.password)
    if (!isEqual) {
      throw new Error('username or password is incorrect')
    }

    const jabatan = await db.models.Jabatan.findOne({ where: { karyawanId: userExists.id } })

    const token = jwt.sign({
      userId: userExists.id,
      username: userExists.username,
      userType: jabatan.nama
    }, AUTH_TOKEN, {
        expiresIn: '365d'
      })

    return {
      userId: userExists.id,
      username: userExists.username,
      userType: jabatan.nama,
      token: token,
      tokenExp: '365d'
    }
  } catch (error) {
    throw new Error('Permission Denied')
  }
}

const register = () => {
  
}