'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kategori = sequelize.define('Kategori', {
    nama: DataTypes.STRING
  }, {});
  Kategori.associate = function(models) {
    // associations can be defined here
  };
  return Kategori;
};