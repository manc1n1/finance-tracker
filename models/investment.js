'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

Investment.belongsTo(models.Portfolio,{
  foreignKey:"portfolioId",
  as:"portfolio"
})
      /*
         Expense.associate = models => {
          Expense.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
          });

    Expense.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  };
      */
    }
  }
  Investment.init({
   investmentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    type: {
        type: DataTypes.STRING,
        allowNull: false,p
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
    value: {
        type: DataTypes.FLOAT,
      },
    portfolioId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Portfolio', // name of your model, it should be the exact name of your model file
          key: 'portfolioId', // name of the id field in your model
        },
        allowNull: true, // assuming a category is optional and an expense can exist without a category
      },
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};