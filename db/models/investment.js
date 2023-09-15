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
			this.belongsTo(models.Portfolio, { foreignKey: 'portfolio_id' });
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
			type: {
				type: DataTypes.ENUM('Stock', 'Cryptocurrency', 'Other'),
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			quantity: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			value: {
				type: DataTypes.FLOAT,
			},
			portfolio_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Portfolios',
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
