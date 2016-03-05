var mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://heroku_ncj5lwf2:cc4bcejjtvbrk0pe51dg42kmsd@ds023458.mlab.com:23458/dailymumm');
} else {
    mongoose.connect('mongodb://localhost/dailymumm');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connected to Database DailyMumm");
});
module.exports = mongoose;
