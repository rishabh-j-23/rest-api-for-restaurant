const express = require('express');
const bodyParser = require('body-parser');

var authenticate = require('../authenticate');

const leaderRouter = express.Router();

const Leaders = require('../models/leader');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req, res, next) => {
    Leaders.find({}).then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => {
        next(err);
    }).catch((err) => {
        next(err);
    });
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.create(req.body).then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => {
        next(err);
    }).catch((err) => {
        next(err);
    });
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.send("PUT req not allowed for /leaderes");
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.deleteMany({}).then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
});


leaderRouter.route('/:leaderID')
.get((req, res) => {
    Leaders.findById(req.params.leaderID).then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => {
        next(err);
    }).catch((err) => {
        next(err);
    });
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.send("POST not available");
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Leaders.findByIdAndUpdate(req.params.leaderID, {$set: req.body}, {new: true}).then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => {
        next(err);
    }).catch((err) => {
        next(err);
    });
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Leaders.findByIdAndDelete(req.params.leaderID).then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => {
        next(err);
    }).catch((err) => {
        next(err);
    });
});

module.exports = leaderRouter;