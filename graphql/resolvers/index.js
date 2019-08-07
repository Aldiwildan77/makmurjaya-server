const karyawanResolvers = require('./karyawan')
const jabatanResolvers = require('./jabatan')
const satuanResolvers = require('./satuan')
const kategoriResolvers = require('./kategori')

const rootResolvers = {
  ...karyawanResolvers,
  ...jabatanResolvers,
  ...satuanResolvers,
  ...kategoriResolvers
}

module.exports = rootResolvers
