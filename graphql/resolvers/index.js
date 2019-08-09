const karyawanResolvers = require('./karyawan'),
  jabatanResolvers = require('./jabatan'),
  satuanResolvers = require('./satuan'),
  kategoriResolvers = require('./kategori'),
  supplierResolvers = require('./supllier')


const rootResolvers = {
  ...karyawanResolvers,
  ...jabatanResolvers,
  ...satuanResolvers,
  ...kategoriResolvers,
  ...supplierResolvers

}

module.exports = rootResolvers
