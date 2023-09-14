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
  Expense.init({
   expenseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // name of your model, it should be the exact name of your model file
          key: 'userId', // name of the id field in your model
        },
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories', // name of your model, it should be the exact name of your model file
          key: 'categoryId', // name of the id field in your model
        },
        allowNull: true, // assuming a category is optional and an expense can exist without a category
      },
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};