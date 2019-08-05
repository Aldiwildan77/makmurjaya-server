const { Jabatan } = require('../../models')

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
      "level": saved.dataValues.level,
      "karyawan": []
    }
  } catch (error) {
    throw error
  }
}

module.exports = { addJabatan }