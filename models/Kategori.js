'use strict';
const { generateId } = require('../helpers/generateId')

module.exports = (sequelize, DataTypes) => {
  const Kategori = sequelize.define('Kategori', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      set: function () {
        this.setDataValue('id', generateId('T'))
      }
    },
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