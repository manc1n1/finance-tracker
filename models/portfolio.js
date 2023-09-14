'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

  

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portfolio.hasMany(models.Investment,{
        foreignKey: 'portfolioId' , as: 'investment'
      })
    }
  }
  Portfolio.init({
    portfolioId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User', // name of your model, it should be the exact name of your model file
          key: 'userId', // name of the id field in your model
        },
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};