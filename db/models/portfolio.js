'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Portfolio extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'user_id' });
			this.hasMany(models.Investment, {
				foreignKey: 'portfolio_id',
				onDelete: 'CASCADE',
			});
			this.hasMany(models.Salary, {
				foreignKey: 'portfolio_id',
				onDelete: 'CASCADE',
			});
		}

		toJSON() {
			return { ...this.get(), user_id: undefined };
		}
	}
	Portfolio.init(
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
			net_worth: {
				type: DataTypes.FLOAT,
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
			modelName: 'Portfolio',
		},
	);
	return Portfolio;
};
