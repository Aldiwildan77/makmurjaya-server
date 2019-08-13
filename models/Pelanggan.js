'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelanggan = sequelize.define('Pelanggan', {
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telepon: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true,
      validate: {
        is: /^(\+62|0)([0-9]{7,12})$/,
        not: ["[a-zA-Z]", "i"]
      }
    },
    alamat: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });

  return Pelanggan;
};