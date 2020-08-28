const mongoose = require('mongoose');
const Gate = mongoose.model('Gate');
const multer = require('multer')
const path = require('path');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const getGates = async (req, res, next) => {
    winston.info('Function=getGates');
    try {
        const gatesRaw = await Gate.find().exec();
        winston.silly('gatesRaw=' + JSON.stringify(gatesRaw));

        const gatesOpt = gatesRaw.map(gate => {
            let { _id, id, name } = gate;
            return { _id, id, name };
        });
        winston.verbose('gatesOpt=' + JSON.stringify(gatesOpt));

        res.status(200).json(gatesOpt);
    } catch (err) {
        winston.error('Get Gates Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Gates.');
        return next(err);
    }
};

const addGate = async (req, res, next) => {
    winston.info('Function=addGate');

    try {
        // a document instance
        const gate = new Gate({
            id: req.body.GateID,
            timestamp: Date.now(),            
            profilePhoto: req.body.profilePhoto,    
            questions: req.body.questions
        });
        winston.silly('gate=' + gate);
        winston.verbose('gate.timestamp=' + gate.timestamp + ' gate.name=' + gate.name + ' process.env.imgFolderUrl=' + process.env.imgFolderUrl + ' profilePhoto=' + gate.profilePhoto);
        // save model to database
        winston.error('Save Gate Error=' + err);
        err = new ErrorHandler(500, 'Failed to Save Gate.');
        return next(err);
        //const savedGate = await gate.save();
        //winston.debug('Saved Gate=' + savedGate);
        //res.status(200).json(savedGate);
    } catch (err) {
        winston.error('Save Gate Error=' + err);
        err = new ErrorHandler(500, 'Failed to Save Gate.');
        return next(err);
    }
};

const getGate = async (req, res, next) => {
    winston.info('Function=getGate req.params.gateID=' + req.params.gateID);
    try {
        const gate = await Gate.findById(req.params.gateID).exec();
        winston.debug('Fetched a Gate=' + gate);
        res.status(200).json(gate);
    } catch (err) {
        winston.error('Get Gate Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Gate=' + req.params.gateID);
        return next(err);
    }
};

const editGate = async (req, res, next) => {
    winston.info('Function=editGate req.params.gateID=' + req.params.gateID);

    try {
        const gate = await Gate.findById(req.params.gateID).exec();
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
        const editedGate = await Gate.findOneAndUpdate({ _id: req.params.gateID }, {
            id: req.body.GateID,
            timestamp: Date.now(),
            profilePhoto: filename,
            question: req.body.question
        });
        //silly gate
        winston.silly('Edited Gate=' + editedGate);
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