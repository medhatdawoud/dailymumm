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

router.post('/user/add',function(req,res){
    var user = new User({name:req.body.username,email:req.body.email,password:req.body.password});
    user.save(function (err, data) {
      if (err) return console.error(err);
      res.json(data);
    });
});

router.get('/users',function(req,res){
    User.find({},function (err, data) {
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

router.post('/user/delete',function(req,res){
    User.remove({'_id':req.body.id},function(err,data){
        if (err) return console.error(err);
        res.json(data);
    });
});

router.post('/user/update',function(req,res){
    User.update({'_id':req.body.id},{name:req.body.username,email:req.body.email,password:req.body.password},function(err,data){
        if (err) return console.error(err);
        res.json(data);
    });
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);