// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Sequelize connection
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Session configuration
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Middleware for session handling
app.use(session(sess));

// Set up Handlebars helpers
const helpers = require('./utils/helpers');

// Configure Handlebars
const hbs = exphbs.create({ helpers });

// Set view engine as Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up middlewares for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use routes
app.use(require('./controllers/'));

// Sync Sequelize models and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
