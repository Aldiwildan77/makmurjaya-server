const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const { Op, Karyawan, Jabatan } = require('../../models')
const { AUTH_TOKEN, SCOPE_ADMIN, SCOPE_KASIR, USER_TYPE } = require('../../config/config')

const login = async ({ username, password }, context) => {
  try {
    let userExists = await Karyawan.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [{
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        model: Jabatan
      }],
      where: { username: { [Op.eq]: username } }
    })

    if (!userExists) {
      throw new Error('User isn\'t exist')
    }

    const isEqual = await bcrypt.compare(password, userExists.password)
    if (!isEqual) {
      throw new Error('username or password is incorrect')
    }

    const jabatan = await _.get(userExists.dataValues, 'Jabatan')
    let scope = jabatan.nama === USER_TYPE.ADMIN ? SCOPE_ADMIN : SCOPE_KASIR

    const token = await jwt.sign({
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

const register = async ({ input }, context) => {
  if ((input.password).length < 8 || (input.password).length > 15) {
    throw new Error('Passwords must be at 8 - 15 characters in length')
  }

  try {
    const hashedPassword = await bcrypt.hash(input.password, 12)
    const checkJabatan = await Jabatan.findOne({ where: { id: { [Op.eq]: input.jabatan_id } } })
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
      nama: input.nama,
      username: input.username,
      email: (input.email).toLowerCase(),
      password: hashedPassword,
      jabatan_id: input.jabatan_id
    })

    const { dataValues } = await karyawan.save()
    return {
      id: dataValues.id,
      nama: dataValues.nama,
      username: dataValues.username,
      email: dataValues.email,
      jabatan: checkJabatan
    }
  } catch (error) {
    throw error
  }
}

const karyawan = async (obj, { }, context) => {
  try {
    const resultKaryawan = await Karyawan.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      include: {
        model: Jabatan,
        attributes: [['nama', 'jabatan_nama'], ['level', 'jabatan_level']],
      }
    })

    let objectReturn = []
    resultKaryawan.forEach(k => {
      let { dataValues, Jabatan } = k

      let object = {
        id: dataValues.id,
        nama: dataValues.nama,
        username: dataValues.username,
        email: dataValues.email,
        jabatan_id: dataValues.jabatan_id,
        jabatan: {
          id: dataValues.jabatan_id,
          nama: Jabatan.dataValues.jabatan_nama,
          level: Jabatan.dataValues.jabatan_level
        }
      }

      objectReturn.push(object)
    });

    return objectReturn

  } catch (error) {
    throw error
  }
}

const updateKaryawan = async ({ id, input }, context) => {
  if (!context.scope.includes('isAdmin')) throw new Error('Permission denied')

  try {
    const checkKaryawan = await Karyawan.findOne({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }, where: { id: { [Op.eq]: id } }
    })
    if (!checkKaryawan) {
      throw new Error('unable to find Karyawan')
    }

    const [numOfAffectedRow, updatedKaryawan] = await Karyawan.update(input, {
      where: {
        id: {
          [Op.eq]: id
        }
      },
      returning: true
    })
    if (!updatedKaryawan) {
      throw new Error('failed to update Karyawan please check your input')
    }

    const mergedUpdate = await _.merge(checkKaryawan.dataValues, input)
    return {
      ...mergedUpdate
    }

  } catch (error) {
    throw error
  }
}

const deleteKaryawan = async ({ id }, context) => {
  if (!context.scope.includes('isAdmin')) throw new Error('Permission denied')

  try {
    const checkKaryawan = await Karyawan.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkKaryawan) {
      throw new Error('those Jabatan isn\'t exist')
    }

    const deletedKaryawan = await Karyawan.destroy({ where: { id: { [Op.eq]: id } } })
    if (!deletedKaryawan) {
      throw new Error('unable to delete Karyawan, please check the relation')
    }

    return `Karyawan ${checkKaryawan.dataValues.nama} has been deleted`
  } catch (error) {
    throw error
  }
}

module.exports = { login, register, karyawan, updateKaryawan, deleteKaryawan }