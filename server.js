const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { sequelize, User, Portfolio } = require('./db/models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
	secret: process.env.SECRET,
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//TODO: Use the Express Router for more detailed routes
app.use(routes);

// app.get('/', function (req, res) {
// 	res.render('home');
// });

// app.get('/users', async (req, res) => {
// 	try {
// 		const users = await User.findAll();

// 		return res.json(users);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ error: 'Something went wrong.' });
// 	}
// });

// app.post('/user', async (req, res) => {
// 	const { first_name, last_name, email, password } = req.body;

// 	try {
// 		const user = await User.create({
// 			first_name,
// 			last_name,
// 			email,
// 			password,
// 		});
// 		return res.json(user);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json(err);
// 	}
// });

// app.get('/portfolios', async (req, res) => {
// 	try {
// 		const portfolios = await Portfolio.findAll({
// 			include: [
// 				{
// 					model: User,
// 				},
// 			],
// 		});

// 		return res.json(portfolios);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ error: 'Something went wrong.' });
// 	}
// });

// app.get('/portfolios/:id', async (req, res) => {
// 	try {
// 		const portfolios = await Portfolio.findAll({
// 			where: {
// 				user_id: req.params.id,
// 			},
// 			include: [
// 				{
// 					model: User,
// 				},
// 			],
// 		});

// 		return res.json(portfolios);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ error: 'Something went wrong.' });
// 	}
// });

// app.post('/portfolio', async (req, res) => {
// 	const { name, user_id } = req.body;

// 	try {
// 		const portfolio = await Portfolio.create({
// 			name,
// 			user_id,
// 		});
// 		return res.json(portfolio);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json(err);
// 	}
// });

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`App listening on port http://localhost:${PORT}`);
	});
});

// SELECT Users.uuid, Portfolios.name FROM Users, Portfolios WHERE Portfolios.user_id = Users.id;
