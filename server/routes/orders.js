module.exports = function (app) {
    var express = require('express');
    var jwt = require('jsonwebtoken');
    var router = express.Router();
    var mailer = require('../helpers/mailer');

    var Order = require('../models/orders');

    app.use('/api/order', router);

    router.post('/', function (req, res) {
        var creator = JSON.parse(req.body.creator),
            list = JSON.parse(req.body.list),
            restaurant = JSON.parse(req.body.restaurant),
            orders = [];
        var order = new Order({ creator: creator, list: list, restaurant: restaurant });
        order.save(function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.get('/byid', function (req, res) {
        var id = req.param('id');

        Order.findOne({ "_id": id }, function (err, data) {
            if (err) return console.error(err);

            if (data) {
                res.json(data)
            } else {
                res.json(null);
            }
        });

    });

    router.put('/', function (req, res) {
        var orderId = req.body.orderId,
            orderItem = JSON.parse(req.body.orderItem);

        Order.update({ "_id": orderId }, {
            $push: {
                items: orderItem
            }
        }, function (err, data) {
            if (err) return console.error(err);

            if (data) {
                res.json(data)
            } else {
                res.json(null);
            }
        });

    });

    router.delete('/', function (req, res) {

    });

};

