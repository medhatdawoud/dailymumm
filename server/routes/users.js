module.exports = function (app) {
    var express = require('express');
    var jwt = require('jsonwebtoken');
    var router = express.Router();
    //   , users = require('../api/users');

    var User = require('../models/users');
    var List = require('../models/lists');

    app.use('/api/user', router);

    router.post('/', function (req, res) {
        var user = new User({ username: req.body.username, fullname: req.body.fullname, email: req.body.email, password: req.body.password });
        user.save(function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.post('/login', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({ email: email, password: password }, function (err, data) {
            if (err) return console.error(err);

            if (data) {
                // create a token
                var token = jwt.sign(data, "AnySecurityTestPhrase", {
                    expiresIn: 86520 // expires in 24 hours
                });

                var object = {
                    id: data._id,
                    email: data.email,
                    fullname: data.fullname,
                    username: data.username,
                    signup_date: data.created_at,
                    invitations: data.invitations,
                    token: token
                }

                res.json(object);
            } else {
                res.json(null);
            }
        });
    });

    router.get('/verifyuserunique', function (req, res) {
        var email = req.query.email;
        var username = req.query.username;

        if (email) {
            User.findOne({ email: email }, function (err, data) {
                if (err) return console.error(err);
                res.json(data);
            });
        } else if (username) {
            User.findOne({ username: username }, function (err, data) {
                if (err) return console.error(err);
                res.json(data);
            });
        }
    });

    app.use(function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                // if (err) {
                //     return res.json({ success: false, message: 'Failed to authenticate token.' });
                // } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;
                next();
                // }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    router.get('/:id', function (req, res) {
        User.findOne({ '_id': req.params.id }, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.delete('/', function (req, res) {
        var id = req.param('id');
        User.remove({ '_id': id }, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.put('/', function (req, res) {
        var id = req.body.id;
        var username = req.body.username;
        var fullname = req.body.fullname;

        User.update({ '_id': id }, { username: username, fullname: fullname }, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.get('/verifycurrentpassword', function (req, res) {
        var id = req.query.id;
        var password = req.query.password;

        User.findOne({ '_id': id, 'password': password }, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.put('/userpassword', function (req, res) {
        var id = req.body.id;
        var password = req.body.password;

        User.update({ '_id': id }, { password: password }, function (err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    router.put('/addinvitation', function (req, res) {
        var listId = req.body.listid;
        var userId = req.body.userid;
        var listname = "";

        List.findOne({ _id: listId }, function (err, result) {
            if (err) return console.error(err);

            listname = result.name;

            User.update({ '_id': userId },
                { $addToSet: { invitations: { id: listId, name: listname } } }, function (err, data) {
                    if (err) return console.error(err);
                    res.json(data);
                });
        });
    });

    router.put('/removeinvitation', function (req, res) {
        var listId = req.body.listid;
        var userId = req.body.userid;
        var userEmail = req.body.useremail;

        User.update({ '_id': userId },
            { $pull: { invitations: { id: listId } } }, function (err, data) {
                if (err) return console.error(err);

                List.update({ "_id": listId, "subscribers.email": userEmail }, {
                    $set: {
                        'subscribers.$': {
                            email: userEmail,
                            confirmed: false,
                            declined: true
                        }
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
    });
};