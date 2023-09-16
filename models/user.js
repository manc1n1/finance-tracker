'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt")


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
    }
    // compare passwords
    checkPassword(loginPw){
      return bcrypt.compareSync(loginPw, this.password)
    }
  }
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks:{
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10)
        return newUserData
      },
      beforeUpdate:async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
        return updatedUserData
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};