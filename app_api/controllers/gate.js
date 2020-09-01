const mongoose = require('mongoose');
const Gate = mongoose.model('Gate');
const multer = require('multer')
const path = require('path');
const winston = require('../config/winston');
const paginate = require('./paginate');
const { ErrorHandler } = require('../models/error')

const getGates = async (req, res, next) => {
    winston.info('Function=getGates');
    try {
        winston.verbose('req.query.limit: ' + req.query.limit + ' req.query.skip: ' + req.query.skip);
        const skip = (parseInt(req.query.page) - 1) * 10;
        const gates = await Gate.aggregate([
            {
                "$facet": {
                    "totalCount": [
                        {
                            "$group": {
                                "_id": null,
                                "count": { "$sum": 1 }
                            }
                        }
                    ],
                    "searchResult": [
                        { $skip: skip },
                        { $limit: 10 },
                        {
                            $addFields: {
                                id: { $arrayElemAt: ["$questions", 2] },
                                name: { $arrayElemAt: ["$questions", 1] }
                            }
                        },
                        {
                            $addFields: {
                                id: "$id.value",
                                name: "$name.value"
                            }
                        },
                        { $project: { _id: 1, "id": 1, "name": 1 } }
                    ]
                }
            }
        ]);
        const pager = paginate.paginate(gates[0].totalCount[0].count, parseInt(req.query.page), 10, 10);
        delete gates[0].totalCount;
        winston.debug('gates: ' + JSON.stringify(gates[0], null, 2));
        res.status(200).json({ 'pager': pager, 'gates': gates[0].searchResult });
    } catch (err) {
        winston.error('Get Gates Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Gates.');
        return next(err);
    }
};

const addGate = async (req, res, next) => {
    winston.info('Function=addGate');
    try {
        let questions = req.body.questions;
        for (let i = 0; i < questions.length; i++) {
            req.body[questions[i].key] = questions[i];
            winston.verbose('req.body[questions[i].key: ' + JSON.stringify(req.body[questions[i].key], null, 2));
        }
        delete req.body.questions;
        req.body.timestamp = Date.now();
        winston.verbose('Gate to be saved: ' + JSON.stringify(req.body, null, 2));
        const savedGate = await Gate.create(req.body);
        winston.debug('Saved Gate=' + savedGate);
        res.status(200).json(savedGate);
    } catch (err) {
        winston.error('Save Gate Error=' + err);
        err = new ErrorHandler(500, 'Failed to Save Gate.');
        return next(err);
    }
};

const getGate = async (req, res, next) => {
    winston.info('Function=getGate req.params.gateID=' + req.params.gateID);
    try {
        const gate = await Gate.findById(req.params.gateID).select('-__v').lean();
        let questions = [];
        const keys = Object.keys(gate);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (!['_id', 'profilePhoto', 'timestamp'].includes(key)) {
                questions.push(gate[key]);
                delete gate[key];
            }
        }
        gate.questions = questions;
        winston.verbose('Fetched a Gate=' + JSON.stringify(gate, null, 2));
        res.status(200).json(gate);
    } catch (err) {
        winston.error('Get Gate Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Gate=' + req.params.gateID);
        return next(err);
    }
};

//race condition problem existed
const editGate = async (req, res, next) => {
    winston.info('Function=editGate req.params.gateID=' + req.params.gateID);

    try {
        const gate = await Gate.findById(req.params.gateID).lean();
        //debug gate
        winston.debug('Fetched a Gate to Edit=' + gate);
        //info req.body.timestamp | gate.timestamp
        winston.info('req.body.timestamp=' + req.body.timestamp + ' gate.timestamp=' + gate.timestamp);

        if (gate.timestamp != req.body.timestamp) {
            throw new ErrorHandler(404, "The Gate had been edited by others.");
        }
    } catch (err) {
        winston.error('Edit Gate Error=' + err);
        return next(err);
    }

    try {
        let questions = req.body.questions;
        for (let i = 0; i < questions.length; i++) {
            req.body[questions[i].key] = questions[i];
            winston.verbose('req.body[questions[i].key: ' + JSON.stringify(req.body[questions[i].key], null, 2));
        }
        delete req.body.questions;
        req.body.timestamp = Date.now();

        const editedGate = await Gate.findOneAndUpdate({ _id: req.params.gateID }, req.body , { new: false }).lean();
        //silly gate
        winston.silly('Edited Gate=' + JSON.stringify(editedGate, null, 2));
        //verbose timestamp | name | profilePhoto
        winston.verbose('timestamp=' + editedGate.timestamp + ' name=' + editedGate.name + ' profilePhoto=' + editedGate.profilePhoto);
        res.status(200).json(editedGate);
    }
    catch (err) {
        winston.error('Edit Gate Error=' + err);
        err = new ErrorHandler(500, 'Failed to edit the gate.');
        return next(err);
    }
};

const deleteGate = async (req, res, next) => {
    const gateID = req.params.gateID;
    winston.info('Function=deleteGate req.params.gateID=' + gateID);

    try {
        const deleteResult = await Gate.deleteOne({ _id: gateID }).exec();
        winston.info('Deleted Gate=' + gateID);
        res.status(200).json(deleteResult);
    } catch (err) {
        winston.error('Delete Gate Error=' + err);
        err = new ErrorHandler(500, 'Failed to delete the Gate=' + gateID);
        return next(err);
    }
};

module.exports = {
    getGates,
    addGate,
    getGate,
    editGate,
    deleteGate
};