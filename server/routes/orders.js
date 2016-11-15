module.exports = function(app) {
    var express = require('express');
    var jwt = require('jsonwebtoken');
    var router = express.Router();
    var mailer = require('../helpers/mailer');

    var Order = require('../models/orders');

    app.use('/api/order', router);

    router.post('/', function(req, res) {
        var creator = JSON.parse(req.body.creator),
            list = JSON.parse(req.body.list),
            restaurant = JSON.parse(req.body.restaurant),
            orders = [];
        var order = new Order({ mean: { name: "", details: "" }, status: "Now", creator: creator, list: list, restaurant: restaurant });
        order.save(function(err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.get('/byid', function(req, res) {
        var id = req.param('id');

        Order.findOne({ "_id": id }, function(err, data) {
            if (err) return console.error(err);

            if (data) {
                res.json(data)
            } else {
                res.json(null);
            }
        });
    });

    router.get('/byuser', function(req, res) {
        var userid = req.param('userid');

        Order.find({ "items.user.id": userid }, function(err, data) {
            if (err) return console.error(err);

            if (data) {
                Order.find({ "creator.id": userid }, function(err2, data2) {
                    if (err2) return console.log(err2);

                    if (data2) {
                        data = data.concat(data2);
                        res.json(data)
                    }
                });
            } else {
                res.json(null);
            }
        });

    });

    router.put('/additems', function(req, res) {
        var orderId = req.body.orderId,
            orderItem = JSON.parse(req.body.orderItem);

        Order.update({ "_id": orderId }, {
            $push: {
                items: orderItem
            }
        }, function(err, data) {
            if (err) return console.error(err);

            if (data) {
                res.json(data)
            } else {
                res.json(null);
            }
        });
    });

    router.put('/', function(req, res) {
        var order = JSON.parse(req.body.order);

        Order.update({ "_id": order._id }, {
            mean: order.mean,
            status: order.status
        }, function(err, data) {
            if (err) return console.error(err);

            if (data) {
                res.json(data)
            } else {
                res.json(null);
            }
        });
    });

    router.delete('/', function(req, res) {

    });

};

