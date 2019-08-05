'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelanggan = sequelize.define('Pelanggan', {
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telepon: {
      type: DataTypes.STRING(16),
      allowNull: true,
      unique: true,
      validate: {
        is: /^\+?([62|0])([0-9]+)$/,
        not: ["[a-zA-Z]", "i"],
        max: 16
      }
    },
    alamat: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });

  return Pelanggan;
};