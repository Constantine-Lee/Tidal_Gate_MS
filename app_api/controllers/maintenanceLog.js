const mongoose = require('mongoose');
const MaintenanceLog = mongoose.model('MaintenanceLog');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error');
const paginate = require('./paginate');

async function findMaintenanceLog(id) {
    winston.info('Function=findMaintenanceLog(id)');
    let maintenanceLog = await MaintenanceLog.findById(id).select('-__v').lean();
    let questions = [];
    const keys = Object.keys(maintenanceLog);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!['_id', 'profilePhoto', 'timestamp', 'id'].includes(key)) {
            questions.push(maintenanceLog[key]);
            delete maintenanceLog[key];
        }
    }
    maintenanceLog.questions = questions;
    return maintenanceLog;
}

const getMaintenanceLogs = async (req, res, next) => {
    winston.info('Function=getMaintenanceLogs');
    try {
        winston.info('req.query.page: ' + req.query.page + ' req.query.searchText: ' + req.query.searchText);
        let pipeline = [];
        if (req.query.searchText && req.query.searchText != "''") {
            pipeline.push({ $match: { $text: { $search: req.query.serchText } } });
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
                    { $project: { _id: 1, "id": "$id", "gate": "$gateName.value", "date": "$date.value", "actionTakenCheckbox": "$actionTaken", "actionNeededCheckbox": "$actionNeed" } }
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
            for (let i = 0; i < length; i++) {
                maintenanceLogs[0].searchResult[i].actionTaken = maintenanceLogs[0].searchResult[i].actionTakenCheckbox.checkboxes.filter(c => c.value == true).reduce((first, second) => {                    
                    return first.label + ', ' + second.label
                });
                delete maintenanceLogs[0].searchResult[i].actionTakenCheckbox;
                maintenanceLogs[0].searchResult[i].actionNeeded = maintenanceLogs[0].searchResult[i].actionNeededCheckbox.checkboxes.filter(c => c.value == true).map(c => c.label).reduce((first, second) => {
                    console.log('first ' + first);
                    return first + ', ' + second;
                });
                delete maintenanceLogs[0].searchResult[i].actionNeededCheckbox;
            }
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
        winston.verbose('Maintenance Log to be saved=' + JSON.stringify(req.body, null, 2));
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
    try {
        maintenanceLog = await MaintenanceLog.findById(req.params.maintenanceLogID).lean();
        winston.debug('Fetched a MaintenanceLog: ' + JSON.stringify(maintenanceLog, null, 2));
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
        req.body.timestamp = new Date();
        const editedMaintenanceLog = await MaintenanceLog.findOneAndUpdate({ _id: req.params.maintenanceLogID }, req.body, { new: false }).lean();
        winston.silly('Edited Maintenance Log=' + editedMaintenanceLog);
        res.status(200).json(editedMaintenanceLog);
    } catch (err) {
        winston.error('Edit Maintenance Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to edit the Maintenance Log: ' + maintenanceLogID);
        return next(err);
    }
};

const deleteMaintenanceLog = async (req, res, next) => {
    const maintenanceLogID = req.params.maintenanceLogID;
    winston.info('Function=deleteMaintenanceLog req.params.maintenanceLogID=' + maintenanceLogID);

    try {
        const deleteResult = await MaintenanceLog.deleteOne({ _id: maintenanceLogID }).lean();
        winston.info('Deleted Maintenance Log=' + maintenanceLogID);
        res.status(200).json(deleteResult);
    } catch (err) {
        winston.error('Delete Maintenance Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to delete Maintenance Log: ' + maintenanceLogID);
        return next(err);
    }
};

module.exports = {
    getMaintenanceLogs,
    addMaintenanceLog,
    getMaintenanceLog,
    editMaintenanceLog,
    deleteMaintenanceLog
};