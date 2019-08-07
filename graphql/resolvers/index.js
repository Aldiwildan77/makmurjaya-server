const karyawanResolvers = require('./karyawan')
const jabatanResolvers = require('./jabatan')
const satuanResolvers = require('./satuan')

const rootResolvers = {
  ...karyawanResolvers,
  ...jabatanResolvers,
  ...satuanResolvers
}

module.exports = rootResolvers
