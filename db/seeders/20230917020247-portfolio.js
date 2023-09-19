'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'Portfolios',
			[
				{
					name: "John's Portfolio 1",
					net_worth: 455.05,
					user_id: 1,
				},
				{
					name: "John's Portfolio 2",
					net_worth: null,
					user_id: 1,
				},
				{
					name: "John's Portfolio 3",
					net_worth: null,
					user_id: 1,
				},
				{
					name: "Jane's Portfolio 1",
					net_worth: 3000,
					user_id: 2,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Portfolios', null, {});
	},
};
