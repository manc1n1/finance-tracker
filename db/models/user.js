'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.Portfolio, {
				foreignKey: 'user_id',
				onDelete: 'CASCADE',
			});
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}

		checkPassword(loginPw) {
			return bcrypt.compareSync(loginPw, this.password);
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { isAlpha: true },
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { isAlpha: true },
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true },
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { len: [8] },
			},
		},
		{
			hooks: {
				beforeCreate: async (newUserData) => {
					newUserData.password = await bcrypt.hash(
						newUserData.password,
						10,
					);
					return newUserData;
				},
			},
			sequelize,
			timestamps: false,
			modelName: 'User',
		},
	);
	return User;
};
