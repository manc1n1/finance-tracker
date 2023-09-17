const router = require("express").Router();
const Portfolio = require("../../db/models/portfolio")

// @post
// /api/portfolio
// create portfolio
router.post('/', async (req, res) => {
	const { name, user_id } = req.body;

	try {
		const portfolio = await Portfolio.create({
			name,
			user_id,
		});
		return res.json(portfolio);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// @get
// api/portfolio/list
// get all portfolios
router.get('/list', async (req, res) => {
	try {
		const portfolios = await Portfolio.findAll();

		return res.json(portfolios);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'Something went wrong.' });
	}
});

module.exports = router