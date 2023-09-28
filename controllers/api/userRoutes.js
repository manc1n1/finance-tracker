const router = require('express').Router();
const { User, Investment } = require('../../db/models');

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { email: req.body.email },
		});

		if (!userData) {
			res.status(400).json({
				message: 'Incorrect email or password, please try again',
			});
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({
				message: 'Incorrect email or password, please try again',
			});
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/signup', async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	try {
		const user = await User.create({
			first_name,
			last_name,
			email,
			password,
		});
		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

router.post('/add', async (req, res) => {
	if (req.session.logged_in) {
		const { name, quantity } = req.body;

		try {
			const investment = await Investment.create({
				name,
				quantity,
				user_id: req.session.user_id,
			});
			return res.json(investment);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	} else {
		res.status(404).end();
	}
});

module.exports = router;
