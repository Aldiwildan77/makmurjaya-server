const { Jabatan } = require('../../models')

const jabatan = async () => {
  try {
    const result = await Jabatan.findAll()
    return result.map(res => {
      return {
        ...res.dataValues
      }
    })

  } catch (error) {
    throw error
  }
}

const addJabatan = async ({ input }, context) => {
  if (!context.scope.includes('isAdmin')) throw new Error('Permission denied')

  try {
    const checkJabatan = await Jabatan.findOne({ where: { nama: input.nama.toLowerCase() } })
    if (checkJabatan) {
      throw new Error('Jabatan already exist')
    }

    const jabatan = await Jabatan.create({
      nama: input.nama.toLowerCase(),
      level: input.level
    })

    const saved = await jabatan.save()
    return {
      "id": saved.dataValues.id,
      "nama": saved.dataValues.nama,
      "level": saved.dataValues.level
    }
  } catch (error) {
    throw error
  }
}

const updateJabatan = async ({ id, input }, context) => {
  if (!context.scope.includes('isAdmin')) throw new Error('Permission denied')

  try {
    const checkJabatan = await Jabatan.findOne({ where: { id } })
    if (!checkJabatan) {
      throw new Error('those Jabatan isn\'t exist')
    }

    const update = {
      id: id,
      nama: input.nama,
      level: input.level
    }

    const updatedJabatan = await Jabatan.update({ update }, { where: { id: id } })
    if (!updatedJabatan) {
      throw new Error('failed to update Jabatan please check your input')
    }

    return {
      ...update
    }

  } catch (error) {
    throw error
  }
}

const deleteJabatan = async ({ id }, context) => {
  if (!context.scope.includes('isAdmin')) throw new Error('Permission denied')

  try {
    const checkJabatan = await Jabatan.findOne({ where: { id } })
    if (!checkJabatan) {
      throw new Error('those Jabatan isn\'t exist')
    }

    const deletedJabatan = await Jabatan.destroy({ where: { id } })
    if (!deletedJabatan) {
      throw new Error('unable to delete Jabatan, please check the relation')
    }

    return `Jabatan ${checkJabatan.dataValues.nama} has been deleted`
  } catch (error) {
    throw error
  }
}

module.exports = { jabatan, addJabatan, updateJabatan, deleteJabatan }