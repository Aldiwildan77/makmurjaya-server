'use strict';
module.exports = (sequelize, DataTypes) => {
  const Karyawan = sequelize.define('Karyawan', {
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Karyawan.associate = function(models) {
    // associations can be defined here
  };
  return Karyawan;
};