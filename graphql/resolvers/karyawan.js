const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op, Karyawan, Jabatan } = require('../../models')
const { AUTH_TOKEN, SCOPE_ADMIN, SCOPE_KASIR, USER_TYPE } = require('../../config/config')
const { generateId } = require('../../helpers/generateId')

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

    const jabatan = await Jabatan.findOne({ where: { id: userExists.jabatan_id } })
    let scope = jabatan.nama === USER_TYPE.ADMIN ? SCOPE_ADMIN : SCOPE_KASIR

    const token = jwt.sign({
      userId: userExists.id,
      scope: scope,
      userType: jabatan.nama
    }, AUTH_TOKEN, {
        expiresIn: '365d'
      })

    return {
      userId: userExists.id,
      userType: jabatan.nama,
      token: token,
      tokenExp: 365,
      scope: scope,
    }
  } catch (error) {
    throw error
  }
}

const register = async ({ input, jabatanLevel }, context) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12)
    const checkUser = await Karyawan.findOne({
      where: {
        [Op.or]: [{ email: input.email },
        { username: input.username }]
      }
    })

    if (checkUser) {
      throw new Error('User already exist')
    }

    const checkJabatan = await Jabatan.findOne({ where: { level: jabatanLevel } })
    if (!checkJabatan) {
      throw new Error('Jabatan doesn\'t exist')
    }

    const karyawan = await Karyawan.create({
      id: generateId('K'),
      nama: input.nama,
      username: input.username,
      email: (input.email).toLowerCase(),
      password: hashedPassword,
      jabatan_id: checkJabatan.dataValues.id
    })

    const saved = await karyawan.save()
    return {
      "id": saved.dataValues.id,
      "nama": saved.dataValues.nama,
      "username": saved.dataValues.username,
      "email": saved.dataValues.email,
      "jabatan": checkJabatan
    }
  } catch (error) {
    throw error
  }
}

const karyawan = async () => {
  try {
    const resultKaryawan = await Karyawan.findAll({ attributes: { exclude: ['password'] } })
    const resultJabatan = await Jabatan.findOne({ where: { id: res.dataValues.jabatan_id } })
    return resultKaryawan.map(res => {
      return {
        ...res.dataValues,
      }
    })

  } catch (error) {
    throw error
  }
}

const deleteKaryawan = () => {

}

const updateKaryawan = () => {

}

module.exports = {
  login,
  register,
  karyawan,
}