'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelanggan = sequelize.define('Pelanggan', {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    telepon: DataTypes.STRING
  }, {});
  Pelanggan.associate = function(models) {
    // associations can be defined here
  };
  return Pelanggan;
};