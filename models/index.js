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
  JabatanModel = require('./Jabatan'),
  RecoveryModel = require('./Recovery')

// init
const Karyawan = KaryawanModel(conn, Sequelize),
  Barang = BarangModel(conn, Sequelize),
  Kategori = KategoriModel(conn, Sequelize),
  Pelanggan = PelangganModel(conn, Sequelize),
  Satuan = SatuanModel(conn, Sequelize),
  Supplier = SupplierModel(conn, Sequelize),
  Cart = CartModel(conn, Sequelize),
  CartDetail = CartDetailModel(conn, Sequelize),
  Jabatan = JabatanModel(conn, Sequelize),
  Recovery = RecoveryModel(conn, Sequelize)

// 1:N 
Jabatan.hasMany(Karyawan, { foreignKey: 'jabatan_id', as: 'Karyawan' })
Karyawan.belongsTo(Jabatan, { foreignKey: 'jabatan_id' })

// 1:1
Karyawan.hasOne(Recovery, { foreignKey: 'karyawan_id' })
Recovery.belongsTo(Karyawan, { foreignKey: 'karyawan_id' })

// 1:1
Pelanggan.hasOne(Cart, { foreignKey: 'pelanggan_id' })
Cart.belongsTo(Pelanggan, { foreignKey: 'pelanggan_id' })

// 1:1
Karyawan.hasOne(Cart, { foreignKey: 'karyawan_id' })
Cart.belongsTo(Karyawan, { foreignKey: 'karyawan_id' })

// connection sync
conn
  .sync()
  .then(async _ => {
    events.emit(DB_CONNECTED, "connected")
  })
  .catch(err => {
    console.log(err)
  })

module.exports = { conn, Op, Karyawan, Barang, Karyawan, Kategori, Satuan, Supplier, Cart, CartDetail, Jabatan, Recovery }