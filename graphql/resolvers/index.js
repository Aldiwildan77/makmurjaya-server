const karyawanResolvers = require('./karyawan')
const jabatanResolvers = require('./jabatan')

const rootResolvers = {
  ...karyawanResolvers,
  ...jabatanResolvers
}

module.exports = rootResolvers
