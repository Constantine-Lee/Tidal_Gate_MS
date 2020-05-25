const mongoose = require('mongoose');
const Gate = mongoose.model('Gate');
const multer = require('multer')
const path = require('path');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const getGates = async (req, res) => {
    winston.info('Function=getGates');
    winston.silly('Request Headers=' + JSON.stringify(req.headers) + ' Request Body=' + JSON.stringify(req.body));

    try {
        const results = await Gate.find().exec();        
        winston.silly('results='+JSON.stringify(results));

        const gates = results.map(gate => {
            let { _id, id, name } = gate;
            return { _id, id, name };
        });
        winston.verbose('gates=' + JSON.stringify(gates));

        res.status(200).json(gates);
    } catch (err) {
        winston.error('Fetch gates error='+err);
        err = new Error('Failed to fetch Gates.');
        return next(err);
    }
};

const addGate = async (req, res, next) => {
    winston.silly('Function=addGate Request Headers=' + JSON.stringify(req.headers) + ' Request Body=' + JSON.stringify(req.body));
    let filename;
    try {
        filename = req.file.filename;
        winston.verbose('Filename/req.file.filename: '+filename);
    } catch (err) {
        winston.error('Filename error=' + err);
        err = new ErrorHandler(500, "Please upload an Image.");
        
        return next(err);
    }
    
    try {
        winston.verbose('Req.fileValidationError: ' + req.fileValidationError);
        if (req.fileValidationError == 'goes wrong on the mimetype') {            
            throw new ErrorHandler(500, "Wrong Image Format.");
        }
    } catch (err) {   
        winston.error('File Type Error=' + err);     
        next(err);
    }

    try {        
        // a document instance
        const gate = new Gate({
            timestamp: Date.now(),
            name: req.body.name,
            profilePhoto: process.env.imgFolderUrl + filename,
            question: req.body.question
        });
        winston.verbose('gate.timestamp='+gate.timestamp+' gate.name='+gate.name+' process.env.imgFolderUrl='+process.env.imgFolderUrl+' profilePhoto='+gate.profilePhoto);
        winston.silly('gate.question='+gate.question);
        // save model to database
        const saved = await gate.save();
        winston.debug('Saved Gate='+saved);
        res.status(200).json(saved);
    } catch (err) {
        winston.error('Save Gate Error='+err);
        next(err);
    }

};

const getGate = async (req, res) => {
    console.log('Get a Gate: ' + JSON.stringify(req.params.gateID));
    try {
        const result = await Gate.findById(req.params.gateID).exec();
        console.log('Fetched a Gate: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to fetch a Gate: ' + err);
        res.status(404).json(err);
    }
};

const editGate = async (req, res) => {
    console.log('Edit a Gate: ' + JSON.stringify(req.params.gateID));
    try {
        const result = await Gate.findById(req.params.gateID).exec();

        console.log(req.body);
        console.log(result.timestamp);
        console.log(req.body.timestamp);
        if (result.timestamp != req.body.timestamp) {
            throw new Error("The log had been edited by others.");
        }

        const edited = await Gate.updateOne({ _id: req.params.gateID }, {
            timestamp: Date.now(),
            name: req.body.name,
            profilePhoto: req.body.profilePhoto,
            question: req.body.question
        });
        console.log('Edited a Gate: ');
        res.status(200).json(edited);
    } catch (err) {
        console.log('Failed to edit a Gate: ' + err);
        res.status(404).json(err);
    }
};

const deleteGate = async (req, res) => {
    console.log('Delete a Gate: ' + JSON.stringify(req.params.gateID));
    try {
        const result = await Gate.deleteOne({ _id: req.params.gateID }).exec();
        console.log('Deleted a Gate: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to delete a Gate: ' + err);
        res.status(404).json(err);
    }
};

module.exports = {
    getGates,
    addGate,
    getGate,
    editGate,
    deleteGate
};