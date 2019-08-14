const { Op, Kategori } = require('../../models')

const kategori = async () => {
  try {
    const result = await Kategori.findAll({ attributes: ['id', 'nama'] })
    return result.map(res => {
      return {
        ...res.dataValues
      }
    })

  } catch (error) {
    throw error
  }
}

const addKategori = async ({ input }, context) => {
  if (!context.scope.includes('kategoriGrant')) throw new Error('Permission denied')

  try {
    const checkKategori = await Kategori.findOne({ where: { nama: { [Op.eq]: input.nama.toLowerCase() } } })
    if (checkKategori) {
      throw new Error('Kategori already exist')
    }

    const kategori = await Kategori.create({
      nama: input.nama.toLowerCase(),
    })

    const { dataValues } = await kategori.save()
    return dataValues
  } catch (error) {
    throw error
  }
}

const updateKategori = async ({ id, input }, context) => {
  if (!context.scope.includes('kategoriGrant')) throw new Error('Permission denied')

  try {
    const checkKategori = await Kategori.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkKategori) {
      throw new Error('those Kategori isn\'t exist')
    }

    const update = {
      id: id,
      nama: input.nama.toLowerCase()
    }

    const [numOfAffectedRow, updatedKategori] = await Kategori.update(update, {
      where: {
        id: { [Op.eq]: id }
      },
      returning: true
    })
    if (!updatedKategori) {
      throw new Error('failed to update Kategori please check your input')
    }

    return update
  } catch (error) {
    throw error
  }
}

const deleteKategori = async ({ id }, context) => {
  if (!context.scope.includes('kategoriGrant')) throw new Error('Permission denied')

  try {
    const checkKategori = await Kategori.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkKategori) {
      throw new Error('those Kategori isn\'t exist')
    }

    const deletedKategori = await Kategori.destroy({ where: { id: { [Op.eq]: id } } })
    if (!deletedKategori) {
      throw new Error('unable to delete Kategori, please check the relation')
    }

    return `Kategori ${checkKategori.dataValues.nama} has been deleted`
  } catch (error) {
    throw error
  }
}

module.exports = { kategori, addKategori, updateKategori, deleteKategori }