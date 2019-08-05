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

const addJabatan = async (args, context) => {
  try {
    const checkJabatan = await Jabatan.findOne({ where: { nama: (args.input.nama).toLowerCase() } })
    if (checkJabatan) {
      throw new Error('Jabatan already exist')
    }

    const jabatan = await Jabatan.create({
      nama: (args.input.nama).toLowerCase(),
      level: args.input.level
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

module.exports = { jabatan, addJabatan }