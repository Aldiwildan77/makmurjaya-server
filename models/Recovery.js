'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recovery = sequelize.define('Recovery', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    recoveryExpired: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true
    });

  return Recovery;
};