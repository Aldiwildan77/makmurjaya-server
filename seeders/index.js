const bycrpt = require('bcrypt')

const db = require('../models/connection')
const { karyawan, jabatan } = require('./seed.json')

const runSeed = async () => {
  const { Karyawan, Jabatan } = db.models

  try {
    karyawan.password = await bycrpt.hash(karyawan.password, 12)

    await Jabatan.bulkCreate(jabatan)
    await Karyawan.bulkCreate([karyawan])

    console.log('Seeders added')

  } catch (error) {
    throw error
  }
}

module.exports = { runSeed }
