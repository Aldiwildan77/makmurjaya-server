const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op, Karyawan } = require('../../models')
const { AUTH_TOKEN, SCOPE_ADMIN, SCOPE_KASIR, USER_TYPE } = require('../../config/config')

const login = async ({ username, password }, context) => {
  // if(context.isLogin.include(true)) throw new Error('You are already logged in') 

  try {
    let userExists = await Karyawan.findOne({ where: { username } })
    if (!userExists) {
      throw new Error('User isn\'t exist')
    }

    const isEqual = await bcrypt.compare(password, userExists.password)
    if (!isEqual) {
      throw new Error('username or password is incorrect')
    }

    // const jabatan = await Jabatan.findOne({ where: { karyawanId: userExists.id } })
    // let scope = jabatan.nama === USER_TYPE.ADMIN ? SCOPE_ADMIN : SCOPE_KASIR

    const token = jwt.sign({
      userId: userExists.id,
      // scope: scope,
      // userType: jabatan.nama
    }, AUTH_TOKEN, {
        expiresIn: '365d'
      })

    return {
      userId: userExists.id,
      // scope: scope,
      // userType: jabatan.nama,
      token: token,
      tokenExp: 365
    }
  } catch (error) {
    throw error
  }
}

const register = async (args, context) => {
  try {
    const hashedPassword = await bcrypt.hash(args.input.password, 12)
    const checkUser = await Karyawan.findOne({
      where: {
        [Op.or]: [{ email: args.input.email },
        { username: args.input.username }]
      }
    })

    if (checkUser) {
      throw new Error('User already exist')
    }

    const karyawan = await Karyawan.create({
      nama: args.input.nama,
      username: args.input.username,
      email: (args.input.email).toLowerCase(),
      password: hashedPassword
    })

    const saved = await karyawan.save()
    return {
      "id": saved.dataValues.id,
      "nama": saved.dataValues.nama,
      "username": saved.dataValues.username,
      "email": saved.dataValues.email
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  login,
  register
}