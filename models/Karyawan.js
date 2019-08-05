'use strict';
const { generateId } = require('../helpers/generateId')

module.exports = (sequelize, DataTypes) => {
  const Karyawan = sequelize.define('Karyawan', {
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
    username: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 15]
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        min: 8
      }
    }
  }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true
    });

  return Karyawan;
};