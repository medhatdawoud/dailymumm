module.exports = function (app) {
    var express = require('express');
    var jwt = require('jsonwebtoken');
    var router = express.Router();
    //   , users = require('../api/users');

    var Restaurant = require('../models/restaurants');

    app.use('/api/restaurants', router);

    router.post('/', function (req, res) {
        var name = req.body.name,
            rating = req.body.rating,
            picturePath = req.body.picturePath,
            menus = JSON.parse(req.body.menus),
            phoneNumbers = req.body.phoneNumbers;
        var rest = new Restaurant({ name: name, rating: rating, picturePath: picturePath, menus: menus, phoneNumbers: phoneNumbers });
        rest.save(function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.get('/', function (req, res) {
        Restaurant.find({}, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.put('/', function (req, res) {

    });

    router.delete('/', function (req, res) {

    });

};