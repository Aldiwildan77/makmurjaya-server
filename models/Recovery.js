'use strict';
const { generateId } = require('../helpers/generateId')

module.exports = (sequelize, DataTypes) => {
  const Recovery = sequelize.define('Recovery', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    durasi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });

  return Recovery;
};