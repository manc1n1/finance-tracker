const express = require('express');
const Sequelize = require('sequelize');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize, User, Portfolio } = require('./db/models');
const routes = require("./controllers")

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
app.use("/", routes)

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//TODO: Use the Express Router for more detailed routes
// app.use(routes);

app.get('/', function (req, res) {
	res.render('home');
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
