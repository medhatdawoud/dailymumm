var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dailymumm');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Connected to Database DailyMumm");
});
module.exports = mongoose;
