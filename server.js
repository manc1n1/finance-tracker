const express = require('express');
const Sequelize = require('sequelize');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize, User, Portfolio } = require('./db/models');
// const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

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

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//TODO: Use the Express Router for more detailed routes
// app.use(routes);

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/users', async (req, res) => {
	try {
		const users = await User.findAll();

		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'Something went wrong.' });
	}
});

app.post('/user', async (req, res) => {
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

app.get('/portfolios', async (req, res) => {
	try {
		const portfolios = await Portfolio.findAll();

		return res.json(portfolios);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: 'Something went wrong.' });
	}
});

app.post('/portfolio', async (req, res) => {
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

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`App listening on port http://localhost:${PORT}`);
	});
});

// sequelize.authenticate().then(() => {
// 	app.listen(PORT, () => {
// 		console.log(`App listening on port http://localhost:${PORT}`);
// 		console.log(`${process.env.DB_NAME} CONNECTED.`);
// 	});
// });

// SELECT Users.uuid, Portfolios.name FROM Users, Portfolios WHERE Portfolios.user_id = Users.id;
