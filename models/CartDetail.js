'use strict';
const { generateId } = require('../helpers/generateId')

module.exports = (sequelize, DataTypes) => {
  const CartDetail = sequelize.define('CartDetail', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      set: function () {
        this.setDataValue('id', generateId('D'))
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    harga: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true
    });

  return CartDetail;
};