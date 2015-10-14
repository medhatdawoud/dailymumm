'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;

// For gzip compression
app.use(express.compress());

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

/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    response.write('index');
});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);