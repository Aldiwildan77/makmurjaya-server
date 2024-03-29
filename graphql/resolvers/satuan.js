const { Op, Satuan } = require('../../models')

const satuan = async () => {
  try {
    const result = await Satuan.findAll({
      attributes: ['id', 'nama'],
      order: [['id', 'ASC']]
    })
    return result.map(res => {
      return {
        ...res.dataValues
      }
    })
  } catch (error) {
    throw error
  }
}

const satuanByFilter = async ({ filter }) => {
  try {
    const result = await Satuan.findAll({
      attributes: ['id', 'nama'],
      where: {
        [Op.or]: [
          { id: { [Op.eq]: filter } },
          { nama: { [Op.substring]: filter } }
        ]
      }
    })

    return result.map(res => {
      return {
        ...res.dataValues
      }
    })
  } catch (error) {
    throw error
  }
}

const addSatuan = async ({ input }, context) => {
  if (!context.scope.includes('satuanGrant')) throw new Error('Permission denied')

  try {
    const checkSatuan = await Satuan.findOne({ where: { nama: input.nama.toLowerCase() } })
    if (checkSatuan) {
      throw new Error('Satuan already exist')
    }

    const satuan = await Satuan.create({
      nama: input.nama.toLowerCase()
    })

    const { dataValues } = await satuan.save()
    return dataValues
  } catch (error) {
    throw error
  }
}

const updateSatuan = async ({ id, input }, context) => {
  if (!context.scope.includes('satuanGrant')) throw new Error('Permission denied')

  try {
    const checkSatuan = await Satuan.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkSatuan) {
      throw new Error('those Satuan isn\'t exist')
    }

    const update = {
      id: id,
      nama: input.nama.toLowerCase()
    }

    const [numOfAffectedRow, updatedSatuan] = await Satuan.update(update, {
      where: {
        id: { [Op.eq]: id }
      },
      returning: true
    })
    if (!updatedSatuan) {
      throw new Error('failed to update Satuan please check your input')
    }

    return update
  } catch (error) {
    throw error
  }
}

const deleteSatuan = async ({ id }, context) => {
  if (!context.scope.includes('satuanGrant')) throw new Error('Permission denied')

  try {
    const checkSatuan = await Satuan.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkSatuan) {
      throw new Error('those Satuan isn\'t exist')
    }

    const deletedSatuan = await Satuan.destroy({ where: { id: { [Op.eq]: id } } })
    if (!deletedSatuan) {
      throw new Error('unable to delete Satuan, please check the relation')
    }

    return `Satuan ${checkSatuan.dataValues.nama} has been deleted`
  } catch (error) {
    throw error
  }
}

module.exports = { satuan, addSatuan, updateSatuan, deleteSatuan, satuanByFilter }