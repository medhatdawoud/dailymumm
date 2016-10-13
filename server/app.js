'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '../client/app'));
app.use(express.static(path.join(__dirname, '../client/app')));

require('./routes/index')(app);

app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
