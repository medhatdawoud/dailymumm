var mongoose = require('./../mongo.config');

var UserSchema = mongoose.Schema({
	username: String,
	fullname: String,
	email: String,
	password: String
},{ timestamps:{createdAt:'created_at',updatedAt:'updated_at'}});

var usersModel = mongoose.model('Users',UserSchema);
module.exports = usersModel;