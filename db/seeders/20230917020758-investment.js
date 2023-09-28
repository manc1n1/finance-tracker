'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'Investments',
			[
				{
					name: 'AAPL',
					quantity: 1,
					user_id: 1,
				},
				{
					name: 'AMZN',
					quantity: 2,
					user_id: 1,
				},
				{
					name: 'IBM',
					quantity: 1,
					user_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Investments', null, {});
	},
};
