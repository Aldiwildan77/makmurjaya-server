'use strict';
const { generateId } = require('../helpers/generateId')

module.exports = (sequelize, DataTypes) => {
  const Satuan = sequelize.define('Satuan', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      set: function () {
        this.setDataValue('id', generateId('S'))
      }
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });

  return Satuan;
};