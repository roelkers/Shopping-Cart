
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv').config();
const cookies = require('cookie-parser');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

app.use(express.static('public'));

//Configure template engine
app.set('view engine', 'pug');

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookies());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect(process.env.MONGOLAB_URL);
mongoose.set('debug', true);

require('./models/Users');
require('./config/passport')

const routes = require('./routes')

app.use(routes)

app.listen(process.env.PORT, () => console.log('Server running on http://localhost:8000/'));
