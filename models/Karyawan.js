'use strict';
module.exports = (sequelize, DataTypes) => {
  const Karyawan = sequelize.define('Karyawan', {
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        len: [6,15]
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
    timestamps: true
  });

  return Karyawan;
};