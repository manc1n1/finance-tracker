const router = require("express").Router();
const Salary = require("../../db/models/salary")

// @post
// /api/salary
// create salary
router.post('/', async (req, res) => {
    try {
        const { type, value, portfolio_id } = req.body;
		const salary = await Salary.create({
			type,
            value,
            portfolio_id
		});
		return res.json(salary);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// @update
// api/salary/:id
// update specific portfolio salary
router.put("/:id", async (req, res) => {
    try {
        const [affectedRows] = await Salary.update(req.body, {where:{
            id:req.params.id
        }})

        if(affectedRows > 0) res.status(200).end()
        else res.status(404).end()
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//@get
// api/salary/:portfolio_id
// get portfolio salary
router.get("/:portfolio_id", async (req, res) => {
    try {
        const portfolio_id = req.params.portfolio_id
        const salary = await Salary.findAll({where:{portfolio_id}})

        return res.json(salary)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//@delete
// api/salary/:id
// delete specific salary
router.delete("/:id", async(req, res) => {
    try {
        const id = req.params.id

        const [affectedRows] = await Salary.destroy({where:{id}})

        if(affectedRows > 0) res.status(200).end()
        else res.status(404).end()

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router