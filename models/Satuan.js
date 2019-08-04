'use strict';
module.exports = (sequelize, DataTypes) => {
  const Satuan = sequelize.define('Satuan', {
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    underscored: true,
    timestamps: true
  });

  return Satuan;
};