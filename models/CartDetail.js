'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartDetail = sequelize.define('CartDetail', {
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