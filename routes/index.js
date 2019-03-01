var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Product = require('../models/product');

// Index
router.get('/', function(req, res){
    res.render("index");
});

// Kitchen
router.get('/kitchen', isLoggedIn, function(req, res){
    res.render("kitchen");
});

// Counter
router.get('/counter', isLoggedIn, function(req, res){
    res.render("counter");
});

// Waiter
router.get('/waiter', isLoggedIn, function(req, res){
     // get all products from database
     Product.find({}, function(error, docs){
        // set returned results to products
        var products = docs
        // render waiter view and send products as an array
        res.render('waiter', { products });
    });
});

// Admin
router.get('/admin', isLoggedIn, function(req, res){
    res.render("admin");
});

// AUTHENICATION
//////////////////////////////////////////////////////

// Login
router.post('/login', passport.authenticate("local",
    {
        successRedirect: "/waiter",
        failureRedirect: "/"
    }), function(req, res){
});

// Register
router.post('/register', function(req, res){

    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(error, user){
        if(error){
            console.log(error);
            return res.render("index");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/waiter");
        });
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect("/");
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;