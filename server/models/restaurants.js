var mongoose = require('./../mongo.config');

var RestaurantSchema = mongoose.Schema({
	name: String,
    rating: Number,
    picturePath: String,
    menus: Array,
    phoneNumbers: Array
},{ timestamps:{createdAt:'created_at',updatedAt:'updated_at'}});

var restaurantsModel = mongoose.model('Restaurants',RestaurantSchema);
module.exports = restaurantsModel;