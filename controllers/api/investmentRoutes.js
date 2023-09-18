const router = require("express").Router();
const Investment = require("../../db/models/investment")

// @post
// /api/investment
// create an investment
router.post('/', async (req, res) => {
    
    try {
        const { type, name, quantity, value, portfolio_id } = req.body;
		const investment = await Investment.create({
			type, name, quantity, value, portfolio_id
		});
		return res.json(investment);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

module.exports = router