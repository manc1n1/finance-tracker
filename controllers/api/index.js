const router = require("expres").Router();
const User = require("../../models/user")


// @post
// /api/user
// creating user
router.post("/user", async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body
        const userData = await User.create({first_name, last_name, email, password})
        res.stats(200).json(userData)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})