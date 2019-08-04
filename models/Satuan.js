'use strict';
module.exports = (sequelize, DataTypes) => {
  const Satuan = sequelize.define('Satuan', {
    nama: DataTypes.STRING
  }, {});
  Satuan.associate = function(models) {
    // associations can be defined here
  };
  return Satuan;
};