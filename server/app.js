'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router(); 
var port = process.env.PORT || 3000;
var User = require('./data/users');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Locate the views
    app.set('views', '../client');
    
    // Locate the assets
    app.use(express.static('../client'));

} else {
    // Locate the views
    app.set('views', '../client/app');
    
    // Locate the assets
    app.use(express.static('../client/app'));
}


// REGISTER OUR ROUTES ------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

router.post('/user',function(req,res){
    var user = new User({username:req.body.username, email:req.body.email, password:req.body.password});
    user.save(function (err, data) {
      if (err) return console.error(err);
      res.json(data);
    });
});

router.get('/user',function(req,res){
    var email = req.param('email');
    var password = req.param('password');
    User.findOne({email:email, password:password},function (err, data){
        if (err) return console.error(err);
        res.json(data);
    });
});

router.get('/user/:id',function(req,res){
    User.findOne({'_id':req.params.id},function (err, data) {
      if (err) return console.error(err);
      res.json(data);
    });
});

router.delete('/user',function(req,res){
    var id = req.param('id');
    User.remove({'_id':id},function(err,data){
        if (err) return console.error(err);
        res.json(data);
    });
});

router.put('/user',function(req,res){
    var id = req.body.id;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    
    User.update({'_id':id} , {username:username, email:email, password:password},function(err,data){
        if (err) return console.error(err);
        res.json(data);
    });
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);