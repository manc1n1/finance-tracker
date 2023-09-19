'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'Salaries',
			[
				{
					type: 'Minute',
					value: 100,
					portfolio_id: 1,
				},
				{
					type: 'Hourly',
					value: 200,
					portfolio_id: 1,
				},
				{
					type: 'Minute',
					value: 300,
					portfolio_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Salaries', null, {});
	},
};
