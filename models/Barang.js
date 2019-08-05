'use strict';
const { generateId } = require('../helpers/generateId')

module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    hargaBeli: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    hargaJual: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true
    });

  return Barang;
};