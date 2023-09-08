const express = require('express');
const exphbs = require('express-handlebars');

const sequelize = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3001;

//TODO: Don't forget to configure your app to accept JSON
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//TODO: Use the Express Router for more detailed routes

app.get('/', function (req, res) {
	res.render('home');
});

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`App listening on port http://localhost:${PORT}`);
	});
});
