'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jabatan = sequelize.define('Jabatan', {
    nama: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }, 
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });

  return Jabatan;
};