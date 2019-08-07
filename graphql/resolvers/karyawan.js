const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op, Karyawan, Jabatan } = require('../../models')
const { AUTH_TOKEN, SCOPE_ADMIN, SCOPE_KASIR, USER_TYPE } = require('../../config/config')
const { generateId } = require('../../helpers/generateId')

const login = async ({ username, password }, context) => {
  try {
    let userExists = await Karyawan.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [{
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        model: Jabatan
      }],
      where: { username: { [Op.eq]: username } },
      limit: 1
    })

    if (!userExists) {
      throw new Error('User isn\'t exist')
    }

    const isEqual = await bcrypt.compare(password, userExists[0].password)
    if (!isEqual) {
      throw new Error('username or password is incorrect')
    }

    const jabatan = {
      ...userExists[0].Jabatan.dataValues
    }
    let scope = jabatan.nama === USER_TYPE.ADMIN ? SCOPE_ADMIN : SCOPE_KASIR

    const token = jwt.sign({
      userId: userExists[0].id,
      scope: scope,
      userType: jabatan.nama
    }, AUTH_TOKEN, {
        expiresIn: '365d'
      })

    return {
      userId: userExists[0].id,
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
    const checkJabatan = await Jabatan.findOne({ where: { level: { [Op.eq]: jabatanLevel } } })
    if (!checkJabatan) {
      throw new Error('Jabatan doesn\'t exist')
    }

    const checkUser = await Karyawan.findOne({
      where: {
        [Op.or]: [{ email: { [Op.eq]: input.email } },
        { username: { [Op.eq]: input.username } }]
      }
    })
    if (checkUser) {
      throw new Error('User already exist')
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

const karyawan = async (obj, { }, context) => {
  // if(!context) throw new Error('Permission denied')

  // PAKE DATALOADER 
  try {
    const resultKaryawan = await Karyawan.findAll({ attributes: { exclude: ['password'] } })
    // const resultJabatan = await Jabatan.findOne({
    //   where: {
    //     level: {
    //       [Op.eq]: res.dataValues.jabatan_level
    //     }
    //   }
    // })

    return resultKaryawan.map(res => {
      return {
        ...res.dataValues
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