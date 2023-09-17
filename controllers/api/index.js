const router = require("express").Router();
const User = require("../../db/models/user")

function setUserSessions(req, userData){
    // store user information in session
    req.session.user_id = userData.id
    req.session.first_name = userData.first_name 
    req.session.last_name = userData.last_name 
    req.session.email = userData.email 
    req.session.logged_in = true
}

// @post
// /api/user
// creating user
router.post("/user", async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body
        const userData = await User.create({first_name, last_name, email, password})

       // store user info in session
       setUserSessions(req, userData)

        res.status(200).json(userData)
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

         // store user info in session
       setUserSessions(req, userData)

        res.json({user:userData, message:"You are now logged"})

    } catch (error) {
        console.log(err)
        res.status(400).json(err)
    }
})

// @post
// /api/user/logout
// login user out
router.post("/user/logout",async (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        })
    }else {
        console.log(err)
        res.status(404).end()
    }
})

// @get
// /api/users
// get all users
router.get('/users', async (req, res) => {
	try {
		const users = await User.findAll();

		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'Something went wrong.' });
	}
});

// @post
// /api/portfolio
// create portfolio
router.post('/portfolio', async (req, res) => {
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
// /api/portfolios
// get all portfolios
router.get('/portfolios', async (req, res) => {
	try {
		const portfolios = await Portfolio.findAll();

		return res.json(portfolios);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'Something went wrong.' });
	}
});

module.exports = router