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
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			quantity: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Investments');
	},
};
