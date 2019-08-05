const conn = require('./connection')
const Sequelize = require('sequelize')
const { events, DB_CONNECTED } = require('../config/events')
const Op = require('sequelize').Op

// import partly
const BarangModel = require('./Barang'),
  KaryawanModel = require('./Karyawan'),
  KategoriModel = require('./Kategori'),
  PelangganModel = require('./Pelanggan'),
  SatuanModel = require('./Satuan'),
  SupplierModel = require('./Supplier'),
  CartModel = require('./Cart'),
  CartDetailModel = require('./CartDetail'),
  JabatanModel = require('./Jabatan')

// database relation here
const Karyawan = KaryawanModel(conn, Sequelize)

// connection sync
conn
  .sync()
  .then(async _ => {
    events.emit(DB_CONNECTED, "connected")
  })
  .catch(err => {
    console.log(err)
  })

module.exports = { conn, Op, Karyawan }