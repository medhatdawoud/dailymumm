module.exports = function (app) {
    var express = require('express');
    var jwt = require('jsonwebtoken');
    var router = express.Router();
	//   , users = require('../api/users');

    var List = require('../models/lists');

    app.use('/api/lists', router);

    router.post('/', function (req, res) {
        var listData = JSON.parse(req.body.list);
        var listOwnerData = JSON.parse(req.body.owner);
        var list = new List({
            name: listData.name, 
            picturePath: listData.picturePath, 
            subscribers: listData.subscribers,
            owner: {
                id : listOwnerData.id,
                username : listOwnerData.username,
                email : listOwnerData.email
            }
        });
        list.save(function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.get('/byuser', function (req, res) {
        var userId = req.param("userId");
        
        List.find({ "owner.id" : userId }, function(err, data){
            if (err) return console.error(err);

            if (data) {
                List.find({"subscribers":{$elemMatch:{id:userId}}}, function(err2, data2){
                    if (err2) return console.error(err2);

                    if (data2) {
                        data = data.concat(data2);
                        res.json(data)
                    } else {
                        res.json(null);
                    }
                });
            } else {
                res.json(null);
            }
        });
    });

    router.put('/', function (req, res) {
        var listData = JSON.parse(req.body.list);
        
        List.update({ "_id" : listData.id },{ 
            name: listData.name,
            picturePath: listData.picturePath,
            $push: {
                subscribers: {
                    $each: listData.subscribers
                }
            }
         }, function(err, data){
            if (err) return console.error(err);

            if (data) {
                res.json(data)
            } else {
                res.json(null);
            }
        });
    });

    router.put('/invite', function (req, res) {
        var listId = req.body.listId;
        var listOfSubscribers = JSON.parse(req.body.listOfSubscribers);
        
        List.update({ "_id" : listId },{ 
            $push : { 
                subscribers : {
                    $each: listOfSubscribers
                } 
            }
         }, function(err, data){
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