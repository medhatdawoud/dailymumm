'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bodyParser = require('body-parser');
var router = express.Router();
var port = process.env.PORT || 80;
var User = require('./models/users');
var path = require('path');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Locate the views
    app.set('views', path.join(__dirname, '../client/app'));

    // Locate the assets
    app.use(express.static(path.join(__dirname, '../client/app')));

} else {
    // Locate the views
    app.set('views', path.join(__dirname, '../client/app'));

    // Locate the assets
    app.use(express.static(path.join(__dirname, '../client/app')));
}

// REGISTER OUR ROUTES ------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

router.get('/', function (req, res) {
    res.send("api here");
});

router.post('/user', function (req, res) {
    var user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
    user.save(function (err, data) {
        if (err) return console.error(err);
        res.json(data);
    });
});

router.get('/user', function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

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
                fullname: data.firstname + ' ' + data.lastname,
                username: data.username,
                signup_date: data.created_at,
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
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
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

router.get('/verifycurrentpassword', function (req, res) {
    var id = req.query.id;
    var password = req.query.password;

    User.findOne({ '_id': id, 'password': password }, function (err, data) {
        if (err) return console.error(err);
        res.json(data);
    });
});


router.get('/user/:id', function (req, res) {
    User.findOne({ '_id': req.params.id }, function (err, data) {
        if (err) return console.error(err);
        res.json(data);
    });
});

router.delete('/user', function (req, res) {
    var id = req.param('id');
    User.remove({ '_id': id }, function (err, data) {
        if (err) return console.error(err);
        res.json(data);
    });
});

router.put('/user', function (req, res) {
    var id = req.body.id;
    var username = req.body.username;
    var firstname = req.body.fullname.split(' ')[0];
    var lastname = req.body.fullname.split(' ')[1];

    User.update({ '_id': id }, { username: username, firstname: firstname, lastname: lastname }, function (err, data) {
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

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);