const mongoose = require('mongoose');
const { inspectionLogSchema } = require('../models/gateAndLogs');
const InspectionLog = mongoose.model('inspectionlog', inspectionLogSchema);
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')
const paginate = require('./paginate');
const PDFDocument = require('pdfkit');



async function findInspectionLog(id, role) {
    winston.info('Function=findInspectionLog(id)');
    let inspectionLog = await InspectionLog.findById(id).select('-__v').lean();
    if (role == 'User') {
        inspectionLog.testedBy.controlType = 'disabled';
        inspectionLog.witnessedBy.controlType = 'disabled';
        inspectionLog.reviewedBy.controlType = 'disabled';
        inspectionLog.approvedBy.controlType = 'disabled';
    }
    else if (role == 'Supervisor'){
        inspectionLog.testedBy.controlType = 'disabled';
        inspectionLog.witnessedBy.controlType = 'disabled';
        inspectionLog.reviewedBy.controlType = 'textbox';
        inspectionLog.approvedBy.controlType = 'textbox';
    }
    let questions = [];
    const keys = Object.keys(inspectionLog);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!['_id', 'profilePhoto', 'timestamp', 'id'].includes(key)) {
            questions.push(inspectionLog[key]);
            delete inspectionLog[key];
        }
    }
    inspectionLog.questions = questions;
    return inspectionLog;
}

const download = async (req, res, next) => {
    winston.info('Function=download');
    try {
        const doc = new PDFDocument;
        doc.pipe(res);
        const inspectionLog = await findInspectionLog(req.params.inspectionLogID, req.user.role);
        const questions = inspectionLog.questions;
        winston.info("questions: " + JSON.stringify(questions, null, 2));
        doc.fontSize(12);
        doc.text("Jabatan Pengairan dan Saliran Sarawak - Inspection Log");
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

const getInspectionLogs = async (req, res, next) => {
    winston.info('Function=getInspectionLogs');
    try {
        winston.verbose('req.query.page: ' + req.query.page + ' req.query.searchText: ' + req.query.searchText);
        let pipeline = [];
        if (req.query.searchText && req.query.searchText != "''") {
            pipeline.push({ $match: { $text: { $search: req.query.searchText } } });
        }
        let sortCriteria;
        if (req.query.sortImportance == 'ID,DATE') {
            console.log('first');
            sortCriteria = { id: parseInt(req.query.iDSort) };
        }
        else {
            console.log('Second')
            sortCriteria = { 'tarikh.value': parseInt(req.query.dateSort), id: parseInt(req.query.iDSort) };
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
                    { $project: { _id: 1, "id": "$id", "gate": "$lokasiPintuAir.value", "date": "$tarikh.value" } },
                ]
            }
        });

        const inspectionLogs = await InspectionLog.aggregate(pipeline);
        if (inspectionLogs[0].totalCount.length == 0) {
            length = 0;
        }
        else {
            winston.verbose("Total Count: " + inspectionLogs[0].totalCount.length);
            length = inspectionLogs[0].totalCount[0].count;
        }
        const pager = paginate.paginate(length, parseInt(req.query.page), 10, 10);
        delete inspectionLogs[0].totalCount;
        winston.info('inspectionLogs: ' + JSON.stringify(inspectionLogs[0], null, 2));
        res.status(200).json({ 'pager': pager, 'inspectionLogs': inspectionLogs[0].searchResult });
    } catch (err) {
        winston.error('Get Inspection Logs Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Inspection Logs.');
        return next(err);
    }
};

const addInspectionLog = async (req, res, next) => {
    winston.info('Function=addInspectionLog');

    try {
        let questions = req.body.questions;
        for (let i = 0; i < questions.length; i++) {
            req.body[questions[i].key] = questions[i];
        }
        delete req.body.questions;
        req.body.lokasiPintuAir.controlType = 'disabled';
        winston.verbose('Inspection Log to be saved: ' + JSON.stringify(req.body, null, 2));
        const savedInspectionLog = await InspectionLog.create(req.body);
        winston.debug('Saved a InspectionLog: ' + savedInspectionLog);
        res.status(200).json(savedInspectionLog);
    } catch (err) {
        winston.error('Add Inspection Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to Add Inspection Log.');
        return next(err);
    }
};

const getInspectionLog = async (req, res, next) => {
    winston.info('Function=getInspectionLog req.params.inspectionLogID=' + req.params.inspectionLogID);
    try {
        const inspectionLog = await findInspectionLog(req.params.inspectionLogID, req.user.role);
        //winston.verbose('Fetched an Inspection Log=' + JSON.stringify(inspectionLog, null, 2));
        res.status(200).json(inspectionLog);
    } catch (err) {
        winston.error('Get Inspection Log Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Inspection Log=' + req.params.inspectionLogID);
        return next(err);
    }
};

const editInspectionLog = async (req, res, next) => {
    winston.info('Function=editInspectionLog req.params.inspectionLogID=' + req.params.inspectionLogID);
    let inspectionLog;
    try {
        inspectionLog = await InspectionLog.findById(req.params.inspectionLogID).lean();
        winston.debug('Fetched an InspectionLog: ' + JSON.stringify(inspectionLog, null, 2));
        if (inspectionLog.timestamp != req.body.timestamp) {
            throw new ErrorHandler(404, "The Inspection Log had been edited by others.");
        }
    } catch (err) {
        winston.error('Edit Inspection Log Error=' + err);
        return next(err);
    }

    try {
        let questions = req.body.questions;
        for (let i = 0; i < questions.length; i++) {
            req.body[questions[i].key] = questions[i];
        }
        delete req.body.questions;
        req.body.timestamp = new Date();
        const editedInspectionLog = await InspectionLog.findOneAndUpdate({ _id: req.params.inspectionLogID }, req.body, { new: false }).lean();
        //silly inspectionLog
        winston.silly('Edited Inspection Log=' + editedInspectionLog);
        res.status(200).json(editedInspectionLog);
    }
    catch (err) {
        winston.error('Edit Inspection Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to edit the Inspection Log: ' + req.params.inspectionLogID);
        return next(err);
    }
};

const deleteInspectionLog = async (req, res) => {
    const inspectionLogID = req.params.inspectionLog;
    winston.info('Function=deleteInspectionLog req.params.inspectionLogID=' + inspectionLogID);

    try {
        const deleteResult = await InspectionLog.deleteOne({ _id: req.params.inspectionLogID }).lean();
        winston.info('Deleted Inspection Log=' + inspectionLogID);
        res.status(200).json(deleteResult);
    } catch (err) {
        winston.error('Delete Inspection Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to delete the Inspection Log=' + inspectionLogID);
        return next(err);
    }
};

module.exports = {
    getInspectionLogs,
    addInspectionLog,
    getInspectionLog,
    editInspectionLog,
    deleteInspectionLog,
    download
};