'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recovery = sequelize.define('Recovery', {
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