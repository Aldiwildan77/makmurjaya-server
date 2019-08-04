'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cartKode: DataTypes.STRING,
    total: DataTypes.FLOAT
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};