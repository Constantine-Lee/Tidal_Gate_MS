const mongoose = require('mongoose');
const { gateSchema } = require('../models/gateAndLogs');
const Gate = mongoose.model('Gate', gateSchema);
const multer = require('multer')
const path = require('path');
const winston = require('../config/winston');
const paginate = require('./paginate');
const { ErrorHandler } = require('../models/error');
const PDFDocument = require('pdfkit');
const { FileIndex, ImageRefCounter } = require('../models/fileIndexing');
const fs = require('fs');
const fetch = require('node-fetch');

const fetchImage = async (src) => {
    const response = await fetch(src);
    const image = await response.buffer();
  
    return image;
  };

async function findGate(id) {
    let gate = await Gate.findById(id).select('-__v').lean();

    let questions = [];
    const keys = Object.keys(gate);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!['_id', 'schemaOf', 'profilePhoto', 'timestamp'].includes(key)) {
            questions.push(gate[key]);
            delete gate[key];
        }
    }
    gate.questions = questions;
    return gate;
}

const download = async (req, res, next) => {
    winston.info('Function=download');
    try {      
        const doc = new PDFDocument;
        doc.pipe(res);
        const gate = await findGate(req.params.gateID);
        const img = await fetchImage(gate.profilePhoto);
        const questions = gate.questions;
        winston.info("questions: " + JSON.stringify(questions, null, 2));
        doc.fontSize(14);
        doc.text("Jabatan Pengairan dan Saliran Sarawak - Gate");
        doc.moveDown(1);
        doc.image(img, { width: 100 });
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].controlType == "groupLabel") {
                doc.moveDown(1);
                doc.fontSize(12);
                doc.x = 75;
                doc.text(questions[i].label);
                doc.moveDown(0.5);
            }
            if (questions[i].controlType == "textbox") {
                doc.fontSize(10);
                doc.x = 75;
                doc.text(questions[i].label + ' : ');
                doc.x = 325;

                if (questions[i].value != '') {
                    doc.moveUp();
                    doc.text(questions[i].value);

                }
                doc.moveUp();
                doc.x = 325;
                doc.text('                                                            ', { underline: true });
            }
            if (questions[i].controlType == "fullTextbox") {
                doc.fontSize(10);
                doc.x = 75;
                doc.text(questions[i].value, { underline: true });
            }
        }
        doc.end();
    }
    catch (err) {
        winston.error('Generate PDF Error=' + err);
        err = new ErrorHandler(404, 'Failed to Generate PDF.');
        return next(err);
    }
}

const getGates = async (req, res, next) => {
    winston.info('Function=getGates');
    try {
        winston.verbose('req.query.page: ' + req.query.page + ' req.query.searchText: ' + req.query.searchText);
        const skip = (parseInt(req.query.page) - 1) * 10;
        let pipeline = [];
        if (req.query.searchText && req.query.searchText != "''") {
            pipeline.push({ $match: { $text: { $search: req.query.searchText } } });
        }
        pipeline.push({
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
                    { $project: { _id: 1, "id": "$gateID.value", "name": "$gateName.value" } }
                ]
            }
        })
        const gates = await Gate.aggregate(pipeline);
        if (gates[0].totalCount.length == 0) {
            length = 0;
        }
        else { winston.verbose("Total Count: " + gates[0].totalCount.length); length = gates[0].totalCount[0].count; }
        const pager = paginate.paginate(length, parseInt(req.query.page), 10, 10);
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
        }
        delete req.body.questions;
        req.body.timestamp = Date.now();
        req.body.gateName.controlType = "disabled";
        req.body.gateID.controlType = "disabled";
        let imageRefCounter = await ImageRefCounter.findById(req.body._id).select('-__v').lean();

        // get array of non-selected images and decrement FileIndex counter by one
        let arr = imageRefCounter.images.filter(i => req.body.profilePhoto != i);
        imageRefCounter.images = imageRefCounter.images.filter(i => req.body.profilePhoto == i);
        imageRefCounter.submit = true;
        Promise.all([
            ImageRefCounter.findByIdAndUpdate({ _id: req.body._id }, imageRefCounter, { new: true }).lean(),
            FileIndex.update({ _id: arr }, { $inc: { pointer: -1 } }, { multi: true, new: true }).lean(),
        ]).then(([iRC, fI]) => { winston.info('updated imageRefCounter: ' + iRC + ', fileIndex' + fI); });

        //winston.verbose('Gate to be saved: ' + JSON.stringify(req.body, null, 2));
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
        const gate = await findGate(req.params.gateID);
        winston.verbose('Fetched a Gate=' + JSON.stringify(gate, null, 2));
        res.status(200).json(gate);
    } catch (err) {
        winston.error('Get Gate Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Gate=' + req.params.gateID);
        return next(err);
    }
};

//TODO: race condition problem existed
const editGate = async (req, res, next) => {
    winston.info('Function=editGate req.params.gateID=' + req.params.gateID);

    let gate;
    let imageRefCounter;
    try {
        let [g, i] = await Promise.all([
            Gate.findById(req.params.gateID).lean(),
            ImageRefCounter.findById(req.body._id).select('-__v').lean()
        ]);
        gate = g; imageRefCounter = i;  
        winston.debug('Fetched a Gate to Edit=' + gate);
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
        }
        delete req.body.questions;
        req.body.timestamp = Date.now();

        let arr = imageRefCounter.images.filter(i => req.body.profilePhoto != i);
        imageRefCounter.images = imageRefCounter.images.filter(i => req.body.profilePhoto == i);

        let [editedGate, fI, iR] = await Promise.all([
            Gate.findOneAndUpdate({ _id: req.params.gateID }, req.body, { new: true }).lean(),
            FileIndex.update({ _id: arr }, { $inc: { pointer: -1 } }, { multi: true, new: true }).lean(),
            ImageRefCounter.findByIdAndUpdate({ _id: req.body._id }, imageRefCounter, { new: true }).lean()
        ]);

        winston.silly('Edited Gate=' + JSON.stringify(editedGate, null, 2));
        res.status(200).json(editedGate);
    } catch (err) {
        winston.error('Edit Gate Error=' + err);
        return next(err);
    }
};

const deleteGate = async (req, res, next) => {
    winston.info('Function=deleteGate req.params.gateID=' + req.params.gateID);

    try {
        let gate = await Gate.findById(req.params.gateID).select('-__v').lean();
        Promise.all([
            FileIndex.update({ _id: gate.profilePhoto }, { $inc: { pointer: -1 } }, { multi: true, new: true }).lean(),
            Gate.deleteOne({ _id: req.params.gateID }),
            ImageRefCounter.deleteOne({ _id: req.params.gateID })
        ]).then(_ => {
            winston.info('Deleted Gate=' + req.params.gateID);
            res.status(200).json();
        })
    } catch (err) {
        winston.error('Delete Gate Error=' + err);
        err = new ErrorHandler(500, 'Failed to delete the Gate=' + req.params.gateID);
        return next(err);
    }
};

module.exports = {
    getGates,
    addGate,
    getGate,
    editGate,
    deleteGate,
    download
};