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

// @post
// /api/user/login
// login in user
router.post("/user/login",async (req,res) => {
    try {
        const userData = await User.findOne({where:{email:req.body.email}})

        if(!userData){
            res.status(404).json({message:"Incorrect email or password, please try again"})
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if(!validPassword){
            res.status(400).json({message:"Incorrect email or password, please try again"})
        }

        res.json({user:userData, message:"You are now logged"})

    } catch (error) {
        console.log(err)
        res.status(400).json(err)
    }
})