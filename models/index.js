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
Jabatan.hasMany(Karyawan, { foreignKey: { name: 'jabatan_id', allowNull: false } })
Karyawan.belongsTo(Jabatan, { foreignKey: { name: 'jabatan_id', allowNull: false } })

// 1:1
Karyawan.hasOne(Cart, { foreignKey: { name: 'karyawan_id', allowNull: false } })
Cart.belongsTo(Karyawan, { foreignKey: { name: 'karyawan_id', allowNull: false } })

// 1:1
Pelanggan.hasOne(Cart, { foreignKey: { name: 'pelanggan_id', allowNull: false } })
Cart.belongsTo(Pelanggan, { foreignKey: { name: 'pelanggan_id', allowNull: false } })

// N:M
Cart.belongsToMany(Barang, {
  through: CartDetail,
  foreignKey: {
    name: 'cartKode',
    allowNull: false
  },
  as: 'items'
})
Barang.belongsToMany(Cart, {
  through: CartDetail,
  foreignKey: {
    name: 'barang_id',
    allowNull: false
  }
})

// 1:1
Karyawan.hasOne(Cart, { foreignKey: { name: 'karyawan_id', allowNull: false } })
Cart.belongsTo(Karyawan, { foreignKey: { name: 'karyawan_id', allowNull: false } })

// 1:N
Satuan.hasMany(Barang, { foreignKey: { name: 'satuan_id', allowNull: false } })
Barang.belongsTo(Satuan, { foreignKey: { name: 'satuan_id', allowNull: false } })

// 1:N
Kategori.hasMany(Barang, { foreignKey: { name: 'kategori_id', allowNull: false } })
Barang.belongsTo(Kategori, { foreignKey: { name: 'kategori_id', allowNull: false } })

// 1:N
Supplier.hasMany(Barang, { foreignKey: { name: 'supplier_id', allowNull: false } })
Barang.belongsTo(Supplier, { foreignKey: { name: 'supplier_id', allowNull: false } })


// connection sync
conn
  .sync()
  .then(async _ => {
    events.emit(DB_CONNECTED, "connected")
  })
  .catch(err => {
    console.log(err)
  })

module.exports = { conn, Op, Karyawan, Barang, Karyawan, Kategori, Satuan, Supplier, Cart, CartDetail, Jabatan, Recovery, Pelanggan }