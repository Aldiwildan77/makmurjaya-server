const conn = require('./connection')
const {
  events,
  DB_CONNECTED
} = require('../config/events')

// import partly
const Barang = require('./Barang'),
  Karyawan = require('./Karyawan'),
  Kategori = require('./Kategori'),
  Order = require('./Order'),
  OrderDetail = require('./OrderDetail'),
  Pelanggan = require('./Pelanggan'),
  Satuan = require('./Satuan'),
  Supplier = require('./Supplier'),
  Cart = require('./Cart'),
  CartDetail = require('./CartDetail')

// database relation here


// connection sync
conn
  .sync()
  .then(async _ => {
    events.emit(DB_CONNECTED, "connected")
  })
  .catch(err => {
    console.log(err)
  })

module.exports = conn