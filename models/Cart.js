'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
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
    timestamps: true
  });

  return Cart;
};