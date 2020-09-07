const mongoose = require('mongoose');
const Counter = mongoose.model('Counter');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const getCounters = async (req, res, next) => {
    winston.info('Function=getCounters');
    try {
        const counters = await Counter.find().exec();
        winston.info('counters=' + JSON.stringify(counters));
        res.status(200).json(counters);
    } catch (err) {
        winston.error('Get Counters Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Counters.');
        return next(err);
    }
};

const addCounter = async (req, res, next) => {
    winston.info('Function=addCounter');

    try {
        const counter = new Counter({
            _id: req.body._id,
            seq: req.body.seq
        });
        winston.verbose('create a counter='+JSON.stringify(counter));

        const savedCounter = await counter.save();
        winston.verbose('savedCounter='+savedCounter);        
        res.status(200).json(savedCounter);
    } catch (err) {
        winston.error('Add Counter Error='+err);
        err = new ErrorHandler(500, 'Failed to Save Counter.');
        return next(err);
    }
};

const getCounter = async (req, res, next) => {
    const counterID = req.params.counterID;
    winston.info('Function=getCounter req.params.counterID='+counterID);
    try {
        const counter = await Counter.findById(req.params.counterID).exec();
        winston.verbose('Fetched a Counter from database='+JSON.stringify(counter));
        res.status(200).json(counter);
    } catch (err) {
        winston.error('Get Counter Error='+ err);
        err = new ErrorHandler(500, 'Failed to get Counter='+counterID);
        return next(err);
    }
};

const editCounter = async (req, res, next) => {
    const counterID = req.params.counterID;
    winston.info('Function=editCounter req.params.counterID='+counterID);
    try {
        const editedCounter = await Counter.updateOne({ _id: req.params.counterID }, {
            _id: req.body.name,
            seq: req.body.seq
        });
        //silly counter
        winston.verbose('Edited Counter='+editedCounter);
        res.status(200).json(editedCounter);
    } catch (err) {
        winston.error('Edit Counter Error='+err);
        err = new ErrorHandler(500, 'Failed to edit the Counter: '+counterID);
        return next(err);
    }
};

const deleteCounter = async (req, res) => {
    const counterID = req.params.counterID;
    winston.info('Function=deleteCounter req.params.counterID='+counterID);

    try {
        const deleteResult = await Counter.deleteOne({ _id: req.params.counterID }).exec();
        winston.info('Deleted Counter='+counterID);
        res.status(200).json(deleteResult);
    } catch (err) {
        winston.error('Delete Counter Error='+err);
        err = new ErrorHandler(500, 'Failed to delete the Counter: '+counterID);
        return next(err);
    }
};

module.exports = {
    getCounters,
    addCounter,
    getCounter,
    editCounter,
    deleteCounter
};