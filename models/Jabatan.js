'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jabatan = sequelize.define('Jabatan', {
    nama: DataTypes.STRING
  }, {});
  Jabatan.associate = function(models) {
    // associations can be defined here
  };
  return Jabatan;
};