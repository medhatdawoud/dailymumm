var mongoose = require('./../mongo.config');

var ListSchema = mongoose.Schema({
	name: String,
	picturePath: String,
	subscribers: Array,
	owner: {
        id: String,
        username: String,
        email: String
    }
},{ timestamps:{createdAt:'created_at',updatedAt:'updated_at'}});

var listsModel = mongoose.model('Lists',ListSchema);
module.exports = listsModel;