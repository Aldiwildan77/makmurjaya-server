const { Op, Pelanggan } = require('../../models')

const pelanggan = async () => {
  try {
    const resultPelanggan = await Pelanggan.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })

    let objectReturn = []
    resultPelanggan.forEach(p => {
      let { dataValues } = p

      let object = {
        id: dataValues.id,
        nama: dataValues.nama,
        telepon: dataValues.telepon,
        alamat: dataValues.alamat
      }

      objectReturn.push(object)
    });

    return objectReturn
  } catch (error) {
    throw error
  }
}

const addPelanggan = async ({ input }, context) => {
  if (!context.scope.includes('pelangganGrant')) throw new Error('Permission denied')

  let validatePhone = /^(\+62|0)([0-9]{7,12})$/.test(input.telepon)
  if (!validatePhone) {
    throw new Error('Your phone number is not allowed, please use  only number and +62 or 0 number as prefix')
  }

  try {
    const pelanggan = await Pelanggan.create({
      nama: input.nama,
      telepon: input.telepon,
      alamat: input.alamat
    })
    const { dataValues } = await pelanggan.save()
    return {
      id: dataValues.id,
      nama: dataValues.nama,
      telepon: dataValues.telepon,
      alamat: dataValues.alamat
    }
  } catch (error) {
    throw error
  }
}

const updatePelanggan = async ({ id, input }, context) => {
  if (!context.scope.includes('pelangganGrant')) throw new Error('Permission denied')

  let validatePhone = /^(\+62|0)([0-9]{7,12})$/.test(input.telepon)
  if (!validatePhone) {
    throw new Error('Your phone number is not allowed, please use  only number and +62 or 0 number as prefix')
  }

  try {
    const checkPelanggan = await Pelanggan.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkPelanggan) {
      throw new Error('those Pelanggan isn\'t exist')
    }

    const update = {
      id: id,
      nama: input.nama,
      telepon: input.telepon,
      alamat: input.alamat
    }

    const [numOfAffectedRow, updatedPelanggan] = await Pelanggan.update(update, {
      where: {
        id: { [Op.eq]: id }
      },
      returning: true
    })
    if (!updatedPelanggan) {
      throw new Error('failed to update Pelanggan please check your input')
    }

    return update
  } catch (error) {
    throw error
  }
}

const deletePelanggan = async ({ id }, context) => {
  if (!context.scope.includes('pelangganGrant')) throw new Error('Permission denied')

  try {
    const checkPelanggan = await Pelanggan.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkPelanggan) {
      throw new Error('those Pelanggan isn\'t exist')
    }

    const deletedPelanggan = await Pelanggan.destroy({ where: { id: { [Op.eq]: id } } })
    if (!deletedPelanggan) {
      throw new Error('unable to delete Pelanggan, please check the relation')
    }

    return `Pelanggan ${checkPelanggan.dataValues.nama} has been deleted`
  } catch (error) {
    throw error
  }
}

module.exports = { pelanggan, addPelanggan, updatePelanggan, deletePelanggan }

