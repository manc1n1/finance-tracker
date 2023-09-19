'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Investments', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			type: {
				type: Sequelize.ENUM('Stock', 'Cryptocurrency', 'Other'),
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			quantity: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			value: {
				type: Sequelize.FLOAT,
			},
			total_value: {
				type: Sequelize.FLOAT,
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
		await queryInterface.dropTable('Investments');
	},
};
