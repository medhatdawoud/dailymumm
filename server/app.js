'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router(); 
var port = process.env.PORT || 3000;

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

router.get('/orders',function(req,res){
	res.json({order:"1",details:"123456789"});
});

router.post('/addorder',function(req,res){
	res.json({admin:req.body.administrator});
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);