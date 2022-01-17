'use strict';

const Dog = (sequelize, DataTypes) => sequelize.define('dog', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Dog;