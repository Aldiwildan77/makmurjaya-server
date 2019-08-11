'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kategori = sequelize.define('Kategori', {
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });

  return Kategori;
};