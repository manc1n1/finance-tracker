'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'Investments',
			[
				{
					type: 'Stock',
					name: 'AAPL',
					quantity: 1,
					value: 175.05,
					total_value: 175.05,
					portfolio_id: 1,
				},
				{
					type: 'Stock',
					name: 'AMZN',
					quantity: 2,
					value: 140.0,
					total_value: 280.0,
					portfolio_id: 1,
				},
				{
					type: 'Other',
					name: 'Laptop',
					quantity: 1,
					value: 3000,
					total_value: 3000,
					portfolio_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Investments', null, {});
	},
};
