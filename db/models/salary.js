'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Salary extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Portfolio, { foreignKey: 'portfolio_id' });
		}
	}
	Salary.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			type: {
				type: DataTypes.ENUM('Minute', 'Hourly', 'Daily', 'Weekly'),
				allowNull: false,
			},
			value: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			portfolio_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Portfolio',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			timestamps: false,
			modelName: 'Salary',
		},
	);
	return Salary;
};
