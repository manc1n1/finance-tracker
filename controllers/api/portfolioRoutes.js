const router = require("express").Router();
const Portfolio = require("../../db/models/portfolio")

// @post
// /api/portfolio
// create portfolio
router.post('/', async (req, res) => {
    
    try {
        const { name, net_worth } = req.body;
        const user_id = req.session.user_id
		const portfolio = await Portfolio.create({
			name,
            net_worth,
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

//@get
// api/portfolio/list-user
// get all users portfolio
router.get("/list-user", async (req, res) => {
    try {
        const user_id = req.session.user_id
        const portfolios = await Portfolio.findAll({where:{user_id}})

        return res.json(portfolios)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//@delete
// api/portfolio/:id
// delete specific user portfolio
router.delete("/:id", async(req, res) => {
    try {
        const id = req.params.id
        const user_id = req.session.user_id

        const [affectedRows] = await Portfolio.destroy({where:{id, user_id}})

        if(affectedRows > 0) res.status(200).end()
        else res.status(404).end()

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// @update
// api/portfolio/:id
// update specific user portfolio
router.put("/:id", async (req, res) => {
    try {
        const [affectedRows] = await Portfolio.update(req.body, {where:{
            id:req.params.id,
            user_id:req.session.user_id
        }})

        if(affectedRows > 0) res.status(200).end()
        else res.status(404).end()
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router