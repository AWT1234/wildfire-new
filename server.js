const express = require('express');
const app = express();
const port = 8000;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const favicon = require('express-favicon');

// Connect to the database
mongoose.connect('mongodb://localhost/wildfire', { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// Favicon
//app.use(favicon(__dirname + '/public/images/favicon.png'));

// ROUTES
var indexRoutes = require('./routes/index');

// MODELS
var Product = require('./models/product');
var User = require('./models/user');
var Order = require('./models/order');


// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "This is a secret!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser());  

// Sends current user to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Use the routes
app.use(indexRoutes);

app.listen(port, () => {
    console.log('Server started: ' + port);
});