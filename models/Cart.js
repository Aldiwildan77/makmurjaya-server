'use strict';
const { generateId } = require('../helpers/generateId')

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      set: function () {
        this.setDataValue('id', generateId('C'))
      }
    },
    cartKode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [10,11]
      }
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });

  return Cart;
};