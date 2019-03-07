var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Product = require('../models/product');
var Order = require('../models/order');

// Index
router.get('/', function(req, res){
    res.render("index");
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

// Kitchen
router.get('/kitchen', isLoggedIn, function(req, res){
    // get all orders from database that are pending
    Order.find({status: "pending"}, function(error, docs){
        // set returned results to products
        var orders = docs
        // render waiter view and send products as an array
        res.render('kitchen', { orders });
    });
});

// Kitchen - new order created
router.post('/kitchen', isLoggedIn, function(req, res){
    
    // data sent from order form
    var orderForm = req.body;

    // assign keys and values from returned object that form sends and save as array
    const productNames = Object.keys(req.body);
    const productQuant = Object.values(req.body);
    
    // empty to array to store array of ordered products
    var orderedItems = [];

    // loop through product name array and create a new object for each item
    for(var i = 0; i < productNames.length-1; i++){
        if(productQuant[i] > 0){
            var product = {
                productName: productNames[i],
                quantity: productQuant[i]
            }
            // add newly created object to array
            orderedItems.push(product);
        }
    }

    var order = {
        orderDate: new Date(),
        tableNum: orderForm.tableNum,
        userID: req.user.id,
        total: 0.00,
        orderDetail: orderedItems,
        paymentMethod: "",
        status: "pending"
    }
    
    var newOrder = new Order(order);

    newOrder.save(function(error){
        if(error){
            console.log(error);
        } else {
            res.redirect('/waiter');
        }
    })
});

// Counter
router.get('/counter', isLoggedIn, function(req, res){
    Order.find({status: "awaiting payment"}, function(error, docs){
        
        if(error){
            console.log(error);
        } else {
            // set returned results to products
            var orders = docs;

            Product.find({}, function(error, docs){
                if(error){
                    console.log(error);
                } else {
                    
                    var prices = [];
                    
                    for(var i = 0; i < docs.length; i++){
                        var product = {
                            productName: docs[i].productName,
                            price: docs[i].price.value
                        };
                        prices.push(product);                       
                    }
                    // render waiter view and send products as an array
                    res.render('counter', { orders, prices });
                }
            });
            
        }
    });
});

router.put('/counter/:id', isLoggedIn, function(req, res){
   
    // get id of order from URL
    var orderId = req.params.id;

    // find order using id
    Order.find({_id: orderId}, function(error, docs){
        
        var order = docs[0];

        // set order status
        order.status = 'awaiting payment';

        // update order in database
        Order.findByIdAndUpdate(orderId, order, function(error){
            if(error){
                console.log(error);
            } else {
                res.redirect('/kitchen');
            }
        });
    });
});

// Admin
// Admin
//get product table
router.get('/admin', [isLoggedIn, isAdmin], function(req, res){
    Product.find({}, function(err, docs){
        var products = docs
        res.render('admin', {products})
    });
});

//post new product to table
router.post('/admin', function(req, res) {
    var newProduct = new Product(req.body);
    newProduct.save()
    return res.redirect("/admin");
});

//delete a product from the table
router.delete('/admin', function(req, res) {
    
});

//update a product on the table
router.put('/admin', function(req, res) {
    
});

router.put('/admin/:id', isLoggedIn, function(req, res){
   
    // get id of order from URL
    var orderId = req.params.id;

    // find order using id
    Order.find({_id: orderId}, function(error, docs){
        
        var order = docs[0];

        // set order status
        order.status = 'completed';

        // update order in database
        Order.findByIdAndUpdate(orderId, order, function(error){
            if(error){
                console.log(error);
            } else {
                res.redirect('/counter');
            }
        });
    });
});


router.get('/printer', [isLoggedIn, isAdmin], function(req, res){
    Product.find({}, function(err, docs){
        var products = docs
        res.render('admin', {products})
    });
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

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.username == 'admin'){
        return next();
    }
    res.redirect('/waiter');
}



module.exports = router;