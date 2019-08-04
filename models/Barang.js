'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    nama: DataTypes.STRING,
    brand: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    hargaBeli: DataTypes.FLOAT,
    hargaJual: DataTypes.FLOAT
  }, {});
  Barang.associate = function(models) {
    // associations can be defined here
  };
  return Barang;
};