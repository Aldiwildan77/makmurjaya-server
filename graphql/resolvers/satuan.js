const { Satuan } = require('../../models')
const { generateId } = require('../../helpers/generateId')

const satuan = async () => {
  try {
    const result = await Satuan.findAll({ attributes: ['id', 'nama'] })
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
      id: generateId('T'),
      nama: input.nama.toLowerCase()
    })

    const { dataValues } = await satuan.save()
    return {
      id: dataValues.id,
      nama: dataValues.nama,
    }

  } catch (error) {
    throw error
  }
}

const updateSatuan = async ({ id, input }, context) => {
  if (!context.scope.includes('satuanGrant')) throw new Error('Permission denied')

  try {
    const checkSatuan = await Satuan.findOne({ where: { id } })
    if (!checkSatuan) {
      throw new Error('those Satuan isn\'t exist')
    }

    const update = {
      id: id,
      nama: input.nama.toLowerCase()
    }

    const [numOfAffectedRow, updatedSatuan] = await Satuan.update(update, {
      where: {
        id: id
      },
      returning: true
    })
    if (!updatedSatuan) {
      throw new Error('failed to update Satuan please check your input')
    }

    return {
      ...update
    }
  } catch (error) {
    throw error
  }
}

const deleteSatuan = async ({ id }, context) => {
  if (!context.scope.includes('satuanGrant')) throw new Error('Permission denied')

  try {
    const checkSatuan = await Satuan.findOne({ where: { id } })
    if (!checkSatuan) {
      throw new Error('those Satuan isn\'t exist')
    }

    const deletedSatuan = await Satuan.destroy({ where: { id } })
    if (!deletedSatuan) {
      throw new Error('unable to delete Satuan, please check the relation')
    }

    return `Satuan ${deletedSatuan.dataValues.nama} has been deleted`
  } catch (error) {
    throw error
  }
}

module.exports = { satuan, addSatuan, updateSatuan, deleteSatuan }