const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors')
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

const Promotions = require('../models/promotions');

const authenticate = require('../authenticate')

var url = 'mongodb://localhost:27017/course';

promoRouter.route('/')
.options(cors.corsWithOPtions, (req, res) => {
    res.sendStatus(200);
})
.get(cors.cors, (req, res, next) => {
    Promotions.find({}).then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.post(cors.corsWithOPtions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log("Promotion Added");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOPtions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.send("PUT req not allowed for /promotions");
})
.delete(cors.corsWithOPtions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.deleteMany({}).then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoID')
.options(cors.corsWithOPtions, (req, res) => {
    res.sendStatus(200);
})
.get(cors.cors, (req, res) => {
    Promotions.findById(req.params.promoID).then((promo) =>{
        res.statusCode = 200;
        res.setHeader("Content-type", 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => {
        next(err);
    });
})
.post(cors.corsWithOPtions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.send("POST not available");
})
.put(cors.corsWithOPtions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotions.findByIdAndUpdate(req.params.promoID, {
        $set : req.body
    }, {new : true}).then((promo) => {
        res.statusCode = 200;
        res.setHeader("Content-type", 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => {
        next(err);
    });
})
.delete(cors.corsWithOPtions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotions.findByIdAndDelete(req.params.promoID).then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;