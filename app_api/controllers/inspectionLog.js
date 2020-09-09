const mongoose = require('mongoose');
const InspectionLog = mongoose.model('inspectionlog');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')
const paginate = require('./paginate');

async function findInspectionLog(id) {
    winston.info('Function=findInspectionLog(id)');
    let inspectionLog = await InspectionLog.findById(id).select('-__v').lean();
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
        const inspectionLog = await findInspectionLog(req.params.inspectionLogID);
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
    deleteInspectionLog
};