var mongoose = require('./../mongo.config');

var OrderSchema = mongoose.Schema({
    tips: Number,
    extras: Number,
    place: String,
    mean: {
        name: String,
        details: String
    },
    status: String,
    creator: {
        id: String,
        username: String,
        fullname: String,
        email: String
    },
    list: {
        id: String,
        name: String,
        subscribers: Array
    },
    restaurant: {
        id: String,
        name: String,
        rating: Number,
        picturePath: String,
        menus: Array,
        phoneNumbers: Array
    },
    items: Array
}, { timestamps: { createdAt: 'startTime', updatedAt: 'updated_at' } });

var ordersModel = mongoose.model('Orders', OrderSchema);
module.exports = ordersModel;