var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var cors = require('./cors');

var router = express.Router();

router.use(bodyParser.json());

router.get('/', cors.corsWithOPtions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        User.find({}).then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => {
            next(err);
        }).catch((err) => {
            next(err);
        });
});

router.post('/signup', cors.corsWithOPtions, (req, res, next) => {
	User.register(new User({ username: req.body.username }), req.body.password,
		(err, user) => {
			if (user == null) {
				res.statusCode = 500;
				res.setHeader('Content-Type', 'application/json');
				res.json({
					err: err
				});
			} else {
				if (req.body.firstname)
					user.firstname = req.body.firstname;
				if (req.body.lastname)
					user.lastname = req.body.lastname;
				user.save((err, user) => {
					if (err) {
						res.statusCode = 500;
						res.setHeader('Content-Type', 'application/json');
						res.json({ err: err });
						return;
					}
				});
				passport.authenticate('local')(req, res, () => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({
						status: 'Registered Successfully',
						success: true
					});
				})
			}
		});
});

router.post('/login', cors.corsWithOPtions, passport.authenticate('local'), (req, res) => {
	var token = authenticate.getToken({_id: req.user._id});

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({
		"success": true,
		"token": token,
	});
});



module.exports = router;