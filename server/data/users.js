var mongoose = require('./config');


var UserSchema = mongoose.Schema({
	username: String,
	firstname: String,
	lastname: String,
	email: String,
	password: String
},{ timestamps:{createdAt:'created_at',updatedAt:'updated_at'}});

var User = mongoose.model('Users',UserSchema);
module.exports = User;