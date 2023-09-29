const router = require('express').Router();
const fetch = require('node-fetch');
const { User, Investment } = require('../db/models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
		});

		const user = userData.get({ plain: true });

		const investmentData = await Investment.findAll({
			where: { user_id: req.session.user_id },
			include: [{ model: User }],
		});

		// const investments = investmentData.map((project) =>
		// 	project.get({ plain: true }),
		// );

		function fetchSymbol(symbol) {
			try {
				return fetch(
					`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.API_KEY}`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					},
				).then((res) => res.json());
			} catch (err) {
				res.status(400).json(err);
			}
		}

		var investmentsArr = [];
		for (let i = 0; i < investmentData.length; i++) {
			await fetchSymbol(investmentData[i].name).then((result) => {
				// console.log(result);
				var dailyData = result[Object.keys(result)[1]];
				var recentDay = dailyData[Object.keys(dailyData)[0]];
				var closePrice = recentDay[Object.keys(recentDay)[3]];

				investmentsArr.push({
					name: investmentData[i].name,
					value:
						parseFloat(closePrice) *
						parseFloat(investmentData[i].quantity),
				});
			});
		}

		let networth = 0;
		for (let i = 0; i < investmentsArr.length; i++) {
			const indexValue = investmentsArr[i].value;
			networth += indexValue;
		}
		networth = '$' + networth;

		res.render('home', {
			user,
			networth,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/add', async (req, res) => {
	if (req.session.logged_in) {
		res.render('add');
		return;
	}

	res.render('login');
});

router.get('/login', async (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

router.get('/signup', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('signup');
});

module.exports = router;
