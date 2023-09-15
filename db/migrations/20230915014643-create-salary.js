'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Salaries', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			type: {
				type: Sequelize.ENUM('Minute', 'Hourly', 'Daily', 'Weekly'),
				allowNull: false,
			},
			value: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			portfolio_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Portfolios',
					key: 'id',
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Salaries');
	},
};
