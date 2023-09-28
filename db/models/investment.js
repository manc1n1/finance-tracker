'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Investment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'user_id' });
		}
	}
	Investment.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			quantity: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			timestamps: false,
			modelName: 'Investment',
		},
	);
	return Investment;
};
