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
        var order = new Order({ mean: { name: "", details: "" }, status: "Now", creator: creator, list: list, restaurant: restaurant });
        order.save(function (err, data) {
            if (err) return console.error(err);

            var dataForEmail = {
                creatorUser: creator.fullname || creator.username,
                restaurant: restaurant.name,
                listname: list.name,
                orderTimeout: 30,
                orderlink: req.headers.host + "/#/order/" + data._id
            }
            for (var i = 0; i < list.subscribers.length; i++) {
                if (list.subscribers[i].confirmed) {
                    if (list.subscribers[i].email !== creator.email) {
                        dataForEmail.username = list.subscribers[i].fullname || list.subscribers[i].username;
                        var username = dataForEmail.username;
                        mailer.sendEmail('start-order', dataForEmail, "Order started from " + restaurant.name + " with " + list.name + " list on Dailymumm", list.subscribers[i].email, function () {
                            console.log('Order call sent to ' + username + ' in ' + list.name + ' list');
                        });
                    }
                }
            }

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

    router.get('/byuser', function (req, res) {
        var userid = req.param('userid');

        Order.find({ "items.user.id": userid }, function (err, data) {
            if (err) return console.error(err);

            if (data) {
                Order.find({ "creator.id": userid }, function (err2, data2) {
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

    router.put('/additems', function (req, res) {
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

    router.put('/', function (req, res) {
        var order = JSON.parse(req.body.order);

        Order.update({ "_id": order._id }, {
            mean: order.mean,
            status: "Waiting"//order.status
        }, function (err, data) {
            if (err) return console.error(err);

            if (data) {
                if (order.status == "Done") {
                    var users = [];
                    var emailsList = [];
                    for (var i = 0; i < order.items.length; i++) {
                        var orderToBind = {
                            username: "",
                            ordernumber: order._id,
                            orderlink: req.headers.host + "/#/order/" + order._id,
                            listname: order.list.name,
                            restaurant: order.restaurant.name,
                            creator: order.creator.fullname || order.creator.username,
                            place: order.place,
                            items: [],
                            shareOfExtras: 5,
                            shareOfTips: 1,
                            duePayment: 0
                        };
                        orderToBind.duePayment = orderToBind.shareOfTips + orderToBind.shareOfExtras;
                        // if (order.items[i].user.id !== order.creator.email) {
                        if (users.indexOf(order.items[i].user.id) < 0) {
                            orderToBind.username = order.items[i].user.fullname || order.items[i].user.username;
                            var itemsList = order.items.filter(function (oneItem) {
                                return oneItem.user.id == order.items[i].user.id;
                            });

                            itemsList.forEach(function (val) {
                                orderToBind.items.push({ "count": val.count, "item": val.item, "price": val.price * val.count })
                                orderToBind.duePayment += val.price * val.count;
                            })

                            users.push(order.items[i].user.id);
                            emailsList.push({ "userEmail": order.items[i].user.email, "order": orderToBind });
                        }
                        // }
                    }
                    // console.log(emailsList);
                    emailsList.forEach(function (oneEmail) {
                        var email = oneEmail.userEmail;
                        var orderToBind = oneEmail.order;
                        mailer.sendEmail('finish-order', orderToBind, "Good news! your order from " + orderToBind.restaurant + " has arrived", email, function () {
                            console.log('Order summary sent to ' + orderToBind.username + ' in ' + orderToBind.listname + ' list');
                        });
                    });

                }
                res.json(data);
            } else {
                res.json(null);
            }
        });
    });

    router.delete('/', function (req, res) {

    });

};

