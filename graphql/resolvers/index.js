const karyawanResolvers = require('./karyawan'),
  jabatanResolvers = require('./jabatan'),
  satuanResolvers = require('./satuan'),
  kategoriResolvers = require('./kategori'),
  supplierResolvers = require('./supllier'),
  recoveryResolvers = require('./recovery')


const rootResolvers = {
  ...karyawanResolvers,
  ...jabatanResolvers,
  ...satuanResolvers,
  ...kategoriResolvers,
  ...supplierResolvers,
  ...recoveryResolvers
}

module.exports = rootResolvers
