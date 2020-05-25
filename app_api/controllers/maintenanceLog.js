const mongoose = require('mongoose');
const MaintenanceLog = mongoose.model('MaintenanceLog');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const getMaintenanceLogs = async (req, res, next) => {
    winston.info('Function=getMaintenanceLogs');
    try {
        const maintenanceLogsRaw = await MaintenanceLog.find().exec();
        winston.silly('maintenanceLogsRaw=' + JSON.stringify(maintenanceLogsRaw));

        const maintenanceLogsOpt = maintenanceLogsRaw.map(log => {
            let { _id, id, gate, date_maintenance, action_needed, action_taken } = log;
            return { _id, id, gate, date_maintenance, action_needed, action_taken };
        });
        winston.verbose('maintenanceLogsOpt=' + JSON.stringify(maintenanceLogsOpt));

        res.status(200).json(maintenanceLogsOpt);
    } catch (err) {
        winston.error('Get Maintenance Logs Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Maintenance Logs.');
        return next(err);
    }
};

const addMaintenanceLog = async (req, res, next) => {
    winston.info('Function=addMaintenanceLog');

    try {
        const maintenanceLog = new MaintenanceLog({
            timestamp: Date.now(),
            gate: req.body.gate,
            date_maintenance: req.body.date_maintenance,
            action_taken: req.body.action_taken,
            action_needed: req.body.action_needed,
            question: req.body.question
        });
        winston.silly('maintenanceLog=' + JSON.stringify(maintenanceLog));
        winston.verbose('timestamp=' + maintenanceLog.timestamp + ' gate=' + maintenanceLog.gate + ' date_maintenance=' + maintenanceLog.date_maintenance + ' action_taken=' + maintenanceLog.action_taken + ' action_needed=' + maintenanceLog.action_needed);

        const savedMaintenanceLog = await maintenanceLog.save();
        winston.debug('Saved a MaintenanceLog=' + maintenanceLog);
        res.status(200).json(savedMaintenanceLog);
    } catch (err) {
        winston.error('Save Maintenance Log Error='+err);
        err = new ErrorHandler(500, 'Failed to Save Maintenance Log.');
        return next(err);
    }
};

const getMaintenanceLog = async (req, res, next) => {
    const maintenanceLogID = req.params.maintenanceLogID;
    winston.info('Function=getMaintenanceLog req.params.maintenanceLogID=' + maintenanceLogID);
    try {
        const maintenanceLog = await MaintenanceLog.findById(maintenanceLogID).exec();
        winston.debug('Fetched a Maintenance Log from database=' + JSON.stringify(maintenanceLog));
        res.status(200).json(maintenanceLog);
    } catch (err) {
        winston.error('Get MaintenanceLog Error=' + err);
        err = new ErrorHandler(500, 'Failed to get MaintenanceLog=' + maintenanceLogID);
        return next(err);
    }
};

const editMaintenanceLog = async (req, res, next) => {
    const maintenanceLogID = req.params.maintenanceLogID;
    winston.info('Function=editMaintenanceLog req.params.maintenanceLogID=' + maintenanceLogID);
    try {
        const maintenanceLog = await MaintenanceLog.findById(maintenanceLogID).exec();
        //debug MaintenanceLog
        winston.debug('Fetched a MaintenanceLog from database to Edit=' + maintenanceLog);
        //info req.body.timestamp | gate.timestamp
        winston.info('req.body.timestamp=' + req.body.timestamp + ' maintenanceLog.timestamp=' + maintenanceLog.timestamp);

        if (maintenanceLog.timestamp != req.body.timestamp) {
            throw new ErrorHandler(404, "The Maintenance Log had been edited by others.");
        }
    } catch (err) {
        winston.error('Edit Maintenance Log Error=' + err);
        return next(err);
    }

    try {
        const editedMaintenanceLog = await MaintenanceLog.updateOne({ _id: maintenanceLogID }, {
            timestamp: Date.now(),
            gate: req.body.gate,
            date_maintenance: req.body.date_maintenance,
            action_taken: req.body.action_taken,
            action_needed: req.body.action_needed,
            question: req.body.question
        });
        //silly maintenanceLog
        winston.silly('Edited Maintenance Log='+editedMaintenanceLog);
        //verbose timestamp | gate | date_maintenance | action_taken | action_needed
        winston.verbose('timestamp='+editedMaintenanceLog.timestamp+' gate='+editedMaintenanceLog.name+' date_maintenance='+editedMaintenanceLog.date_maintenance+' action_taken='+editedMaintenanceLog.action_taken+' action_needed='+editedMaintenanceLog.action_needed);

        res.status(200).json(editedMaintenanceLog);
    } catch (err) {
        winston.error('Edit Maintenance Log Error='+err);
        err = new ErrorHandler(500, 'Failed to edit the Maintenance Log: '+maintenanceLogID);
        return next(err);
    }
};

const deleteMaintenanceLog = async (req, res, next) => {
    const maintenanceLogID = req.params.maintenanceLogID;
    winston.info('Function=deleteMaintenanceLog req.params.maintenanceLogID='+maintenanceLogID);

    try {
        const deleteResult = await MaintenanceLog.deleteOne({ _id: maintenanceLogID }).exec();
        winston.info('Deleted Maintenance Log='+maintenanceLogID);
        res.status(200).json(deleteResult);
    } catch (err) {
        winston.error('Delete Maintenance Log Error='+err);
        err = new ErrorHandler(500, 'Failed to delete the Maintenance Log='+maintenanceLogID);
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