const mongoose = require('mongoose');
const { maintenanceLogSchema } = require('../models/gateAndLogs')
const MaintenanceLog = mongoose.model('MaintenanceLog', maintenanceLogSchema);
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error');
const paginate = require('./paginate');
const PDFDocument = require('pdfkit');
const { ImageRefCounter, FileIndex } = require('../models/fileIndexing');

const fetch = require('node-fetch');

const fetchImage = async (src) => {
    console.log(src);
    const response = await fetch(src);
    const image = await response.buffer();
  
    return image;
  };

async function findMaintenanceLog(id, role) {
    winston.info('Function=findMaintenanceLog(id)');
    let maintenanceLog = await MaintenanceLog.findById(id).select('-__v').lean();
    if (role == 'User') {
        maintenanceLog.testedBy.controlType = 'disabled';
        maintenanceLog.witnessedBy.controlType = 'disabled';
        maintenanceLog.reviewedBy.controlType = 'disabled';
        maintenanceLog.approvedBy.controlType = 'disabled';
    }
    else if (role == 'Supervisor') {
        maintenanceLog.testedBy.controlType = 'disabled';
        maintenanceLog.witnessedBy.controlType = 'disabled';
        maintenanceLog.reviewedBy.controlType = 'textbox';
        maintenanceLog.approvedBy.controlType = 'textbox';
    }
    let questions = [];
    const keys = Object.keys(maintenanceLog);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!['_id', 'schemaOf', 'profilePhoto', 'timestamp', 'id'].includes(key)) {
            questions.push(maintenanceLog[key]);
            delete maintenanceLog[key];
        }
    }
    maintenanceLog.questions = questions;
    return maintenanceLog;
}

const download = async (req, res, next) => {
    winston.info('Function=download');
    try {
        const doc = new PDFDocument;
        doc.pipe(res);
        const maintenanceLog = await findMaintenanceLog(req.params.maintenanceLogID);
        const questions = maintenanceLog.questions;
        winston.info("questions: " + JSON.stringify(questions, null, 2));
        doc.fontSize(12);
        doc.text("Jabatan Pengairan dan Saliran Sarawak - Maintenance Log");
        doc.moveDown(1);
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].controlType == "groupLabel") {
                doc.moveDown(1);
                doc.fontSize(10);
                doc.x = 75;
                doc.text(questions[i].label);
                doc.moveDown(0.5);
            }
            if (questions[i].controlType == "textbox") {
                doc.fontSize(9);
                doc.x = 75;
                doc.text(questions[i].label + ' : ');
                doc.x = 375;

                if (questions[i].value != '') {
                    doc.moveUp();
                    doc.text(questions[i].value);
                }
                doc.moveUp();
                doc.x = 375;
                doc.text('                                                            ', { underline: true });
                doc.moveDown(0.5);
            }
            if (questions[i].controlType == "dropdown") {
                doc.fontSize(9);
                doc.x = 75;
                doc.text(questions[i].label + ' : ');
                doc.x = 375;

                if (questions[i].value != '') {
                    doc.moveUp();
                    doc.text(questions[i].value);

                }
                doc.moveUp();
                doc.x = 375;
                doc.text('                                                            ', { underline: true });
                doc.moveDown(0.5);
            }
            if (questions[i].controlType == "date") {
                doc.fontSize(9);
                doc.x = 75;
                doc.text(questions[i].label + ' : ');
                doc.x = 375;

                if (questions[i].value != '') {
                    doc.moveUp();
                    doc.text(questions[i].value.toString().substring(0, 15));

                }
                doc.moveUp();
                doc.x = 375;
                doc.text('                                                            ', { underline: true });
                doc.moveDown(0.5);
            }
            if (questions[i].controlType == "disabled") {
                doc.fontSize(9);
                doc.x = 75;
                doc.text(questions[i].label + ' : ');
                doc.x = 375;

                if (questions[i].value != '') {
                    doc.moveUp();
                    doc.text(questions[i].value);
                }
                doc.moveUp();
                doc.x = 375;
                doc.text('                                                            ', { underline: true });
                doc.moveDown(0.5);
            }
            if (questions[i].key == "actionTakenCB") {
                let value = questions[i].checkboxes
                    .filter(c => c.value == true).map(c => c.label).reduce((acc, curr) => acc + ', ' + curr);
                console.log(value);
                doc.fontSize(9);
                doc.x = 75;
                doc.text(questions[i].label + ' : ');
                doc.x = 375;
                doc.moveUp();
                doc.text(value);
                doc.moveUp();
                doc.x = 375;
                doc.text('                                                            ', { underline: true });
                doc.moveDown(0.5);
            }
            if (questions[i].key == "actionNeedCB") {
                let value = questions[i].checkboxes
                    .filter(c => c.value == true).map(c => c.label).reduce((acc, curr) => acc + ', ' + curr);
                console.log(value);
                doc.fontSize(9);
                doc.x = 75;
                doc.text(questions[i].label + ' : ');
                doc.x = 375;
                doc.moveUp();
                doc.text(value);
                doc.moveUp();
                doc.x = 375;
                doc.text('                                                            ', { underline: true });
                doc.moveDown(0.5);
            }
            if (questions[i].controlType == "RTX"){
                doc.x = 75;
                let startY = doc.y;
                for(let j = 0; j < questions[i].value.ops.length; j++){
                    if(questions[i].value.ops[j].insert.image){
                        const img = await fetchImage(questions[i].value.ops[j].insert.image);
                        doc.image(img, { width: 50 });
                    }
                    else {
                        doc.text(questions[i].value.ops[j].insert);
                    }
                }
                doc.moveUp();
                let height = doc.y - startY;
                doc.rect(doc.x, startY, 450, height).stroke();
                doc.moveDown();
            }
            if (questions[i].controlType == "fullTextbox") {
                doc.fontSize(9);
                doc.x = 75;
                doc.text(questions[i].value, { underline: true });
                doc.moveDown(0.5);
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

const getMaintenanceLogs = async (req, res, next) => {
    winston.info('Function=getMaintenanceLogs');
    try {
        winston.info('req.query.page: ' + req.query.page + ' req.query.searchText: ' + req.query.searchText);
        let pipeline = [];
        if (req.query.searchText && req.query.searchText != "''") {
            pipeline.push({ $match: { $text: { $search: req.query.searchText } } });
        }
        let sortCriteria;
        if (req.query.sortImportance == 'ID,DATE') {
            sortCriteria = { id: parseInt(req.query.iDSort) };
        }
        else {
            sortCriteria = { 'date': parseInt(req.query.dateSort), id: parseInt(req.query.iDSort) };
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
                    { $sort: sortCriteria },
                    { $skip: (parseInt(req.query.page) - 1) * 10 },
                    { $limit: 10 },
                    { $project: { _id: 1, "id": "$id", "gate": "$gateName.value", "date": "$date.value", "actionTaken": "$actionTakenCB.value", "actionNeeded": "$actionNeedCB.value" } }
                ]
            }
        });

        let maintenanceLogs = await MaintenanceLog.aggregate(pipeline);
        if (maintenanceLogs[0].totalCount.length == 0) {
            length = 0;
        }
        else {
            winston.info("Total Count: " + maintenanceLogs[0].totalCount.length);
            length = maintenanceLogs[0].totalCount[0].count; 
        }
        const pager = paginate.paginate(length, parseInt(req.query.page), 10, 10);
        delete maintenanceLogs[0].totalCount;
        winston.info('maintenanceLogs: ' + JSON.stringify(maintenanceLogs[0], null, 2));
        res.status(200).json({ 'pager': pager, 'maintenanceLogs': maintenanceLogs[0].searchResult });
    } catch (err) {
        winston.error('Get Maintenance Logs Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Maintenance Logs.');
        return next(err);
    }
};

const addMaintenanceLog = async (req, res, next) => {
    winston.info('Function=addMaintenanceLog');

    try {
        let questions = req.body.questions;
        for (let i = 0; i < questions.length; i++) {
            req.body[questions[i].key] = questions[i];
        }
        delete req.body.questions;
        req.body.gateName.controlType = 'disabled';
        req.body.actionTakenCB.value = req.body.actionTakenCB.checkboxes
        .filter(c => c.value == true).map(c => c.label).reduce((acc, curr) => acc + ', ' + curr);
        req.body.actionNeedCB.value = req.body.actionNeedCB.checkboxes
        .filter(c => c.value == true).map(c => c.label).reduce((acc, curr) => acc + ', ' + curr);
        
        let imageRefCounter = await ImageRefCounter.findById(req.body._id).select('-__v').lean();
        // get array of non-selected images and decrement FileIndex counter by one
        let incomingPicArr = [];
        req.body.actionTakenRTX.value.ops.map(i => {
            if (i.insert.image) {
                if (!incomingPicArr.includes(i.insert.image)) {
                    incomingPicArr.push(i.insert.image);
                }
            }
        });
        req.body.actionNeedRTX.value.ops.map(i => {
            if (i.insert.image) {
                if (!incomingPicArr.includes(i.insert.image)) {
                    incomingPicArr.push(i.insert.image);
                }
            }
        })
        //get arrary of non-selected images and decrement FileIndex counter by one
        let arr = imageRefCounter.images.filter(i => !incomingPicArr.includes(i));
        imageRefCounter.images = imageRefCounter.images.filter(i => incomingPicArr.includes(i));
        imageRefCounter.submit = true;
        Promise.all([
            ImageRefCounter.findByIdAndUpdate({ _id: req.body._id }, imageRefCounter, { new: true }).lean(),
            FileIndex.update({ _id: arr }, { $inc: { pointer: -1 } }, { multi: true, new: true }).lean()
        ]).then(([iRC, fI]) => { winston.info('updated imageRefCounter: ' + iRC + ', fileIndex: ' + fI); });

        //winston.verbose('Maintenance Log to be saved=' + JSON.stringify(req.body, null, 2));
        const savedMaintenanceLog = await MaintenanceLog.create(req.body);
        winston.debug('Saved a MaintenanceLog: ' + savedMaintenanceLog);
        res.status(200).json(savedMaintenanceLog);
    } catch (err) {
        winston.error('Add Maintenance Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to Add Maintenance Log.');
        return next(err);
    }
};

const getMaintenanceLog = async (req, res, next) => {
    winston.info('Function=getMaintenanceLog req.params.maintenanceLogID=' + req.params.maintenanceLogID);
    try {
        const maintenanceLog = await findMaintenanceLog(req.params.maintenanceLogID);
        res.status(200).json(maintenanceLog);
    } catch (err) {
        winston.error('Get MaintenanceLog Error=' + err);
        err = new ErrorHandler(404, 'Failed to get MaintenanceLog=' + maintenanceLogID);
        return next(err);
    }
};

const editMaintenanceLog = async (req, res, next) => {
    winston.info('Function=editMaintenanceLog req.params.maintenanceLogID=' + req.params.maintenanceLogID);
    let maintenanceLog;
    let imageRefCounter;
    try {
        let [g, i] = await Promise.all([
            MaintenanceLog.findById(req.params.maintenanceLogID).lean(),
            ImageRefCounter.findById(req.body._id).select('-__v').lean()
        ]);
        maintenanceLog = g; imageRefCounter = i;
        winston.debug('Fetched a MaintenanceLog: ' + JSON.stringify(maintenanceLog, null, 2));
        //check if the record had been modified by others
        if (maintenanceLog.timestamp != req.body.timestamp) {
            throw new ErrorHandler(404, "The Maintenance Log had been edited by others.");
        }
    } catch (err) {
        winston.error('Edit Maintenance Log Error=' + err);
        return next(err);
    }

    try {
        let questions = req.body.questions;
        for (let i = 0; i < questions.length; i++) {
            req.body[questions[i].key] = questions[i];
        }
        delete req.body.questions;
        req.body.timestamp = Date.now();
        req.body.actionTakenCB.value = req.body.actionTakenCB.checkboxes
        .filter(c => c.value == true).map(c => c.label).reduce((acc, curr) => acc + ', ' + curr);
        req.body.actionNeedCB.value = req.body.actionNeedCB.checkboxes
        .filter(c => c.value == true).map(c => c.label).reduce((acc, curr) => acc + ', ' + curr);
        
        let incomingPicArr = [];
        req.body.actionTakenRTX.value.ops.map(i => {
            if (i.insert.image) {
                if (!incomingPicArr.includes(i.insert.image)) {
                    incomingPicArr.push(i.insert.image);
                }
            }
        });
        req.body.actionNeedRTX.value.ops.map(i => {
            if (i.insert.image) {
                if (!incomingPicArr.includes(i.insert.image)) {
                    incomingPicArr.push(i.insert.image);
                }
            }
        })
        //get arrary of non-selected images and decrement FileIndex counter by one
        let arr = imageRefCounter.images.filter(i => !incomingPicArr.includes(i));
        imageRefCounter.images = imageRefCounter.images.filter(i => incomingPicArr.includes(i));

        let [editedMaintenanceLog, fI, iR] = await Promise.all([
            MaintenanceLog.findOneAndUpdate({ _id: req.params.maintenanceLogID }, req.body, { new: true }).lean(),
            FileIndex.update({ _id: arr }, { $inc: { pointer: -1 } }, { multi: true, new: true }).lean(),
            ImageRefCounter.findByIdAndUpdate({ _id: req.body._id }, imageRefCounter, { new: true }).lean()
        ])

        winston.silly('Edited Maintenance Log=' + editedMaintenanceLog);
        res.status(200).json(editedMaintenanceLog);
    } catch (err) {
        winston.error('Edit Maintenance Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to edit the Maintenance Log: ' + maintenanceLogID);
        return next(err);
    }
};

const deleteMaintenanceLog = async (req, res, next) => {
    winston.info('Function=deleteMaintenanceLog req.params.maintenanceLogID=' + req.params.maintenanceLogID);

    try {
        let maintenanceLog = await MaintenanceLog.findById(req.params.maintenanceLogID).select('-__v').lean();
        // extract image into an array (picArr)
        let picArr = [];
        maintenanceLog.actionTakenRTX.value.ops.map(i => {
            if (i.insert.image) {
                if (!picArr.includes(i.insert.image)) {
                    picArr.push(i.insert.image);
                }
            }
        });
        maintenanceLog.actionNeedRTX.value.ops.map(i => {
            if (i.insert.image) {
                if (!picArr.includes(i.insert.image)) {
                    picArr.push(i.insert.image);
                }
            }
        })
        Promise.all([
            FileIndex.update({ _id: picArr }, { $inc: { pointer: -1 } }, { multi: true, new: true }).lean(),
            MaintenanceLog.deleteOne({ _id: req.params.maintenanceLogID }).lean(),
            ImageRefCounter.deleteOne({ _id: req.params.maintenanceLogID })
        ]).then(_ => {
            winston.info('Deleted Maintenance Log=' + req.params.maintenanceLogID);
            res.status(200).json();
        })
    } catch (err) {
        winston.error('Delete Maintenance Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to delete Maintenance Log: ' + req.params.maintenanceLogID);
        return next(err);
    }
};

module.exports = {
    getMaintenanceLogs,
    addMaintenanceLog,
    getMaintenanceLog,
    editMaintenanceLog,
    deleteMaintenanceLog,
    download
};