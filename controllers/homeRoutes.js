const router = require('express').Router();
const { User, Portfolio, Investment, Salary } = require('../db/models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
		});
		const portfolioData = await Portfolio.findByPk(req.session.user_id);
		const investmentData = await Investment.findByPk(req.session.user_id);
		const salaryData = await Salary.findByPk(req.session.user_id);

		const user = userData.get({ plain: true });
		const portfolio = portfolioData.get({ plain: true });
		const investment = investmentData.get({ plain: true });
		const salary = salaryData.get({ plain: true });

		res.render('home', {
			user,
			portfolio,
			investment,
			salary,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
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
