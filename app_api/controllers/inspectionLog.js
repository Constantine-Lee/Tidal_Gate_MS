const mongoose = require('mongoose');
const InspectionLog = mongoose.model('InspectionLog');
const Form = mongoose.model('eventbatch');

const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const getForm = async (req, res, next) => {
    winston.info('Function=getForm');
    try{
        const form = await Form.find().exec();
        winston.silly('getForm=' + JSON.stringify(form));

        res.status(200).json(form);
    } catch (err) {
        winston.error('Get Form Error=' + err);
        err - new ErrorHandler(404, 'Failed to get Form.');
        return next(err);
    }
}


const getInspectionLogs = async (req, res, next) => {
    winston.info('Function=getInspectionLogs');
    try {
        const inspectionLogsRaw = await InspectionLog.find().exec();
        winston.silly('inspectionLogsRaw=' + JSON.stringify(inspectionLogsRaw));

        const inspectionLogsOpt = inspectionLogsRaw.map(log => {
            let { _id, id, gate, date_inspection } = log;
            return { _id, id, gate, date_inspection };
        });
        winston.verbose('inspectionLogsOpt=' + JSON.stringify(inspectionLogsOpt));

        res.status(200).json(inspectionLogsOpt);
    } catch (err) {
        winston.error('Get Inspection Logs Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Inspection Logs.');
        return next(err);
    }
};

const addInspectionLog = async (req, res, next) => {
    winston.info('Function=addInspectionLog');

    try {
        const inspectionLog = new InspectionLog({
            timestamp: Date.now(),
            gate: req.body.gate,
            date_inspection: req.body.date_inspection,
            question: req.body.question
        });
        winston.silly('inspectionLog=' + JSON.stringify(inspectionLog));
        winston.verbose('timestamp=' + inspectionLog.timestamp + ' gate=' + inspectionLog.gate + ' date_inspection=' + inspectionLog.date_inspection);

        const savedInspectionLog = await inspectionLog.save();
        winston.debug('Saved a InspectionLog=' + inspectionLog);
        res.status(200).json(savedInspectionLog);
    } catch (err) {
        winston.error('Save Inspection Log Error=' + err);
        err = new ErrorHandler(500, 'Failed to Save Inspection Log.');
        return next(err);
    }
};

const getInspectionLog = async (req, res, next) => {
    const inspectionLogID = req.params.inspectionLogID;
    winston.info('Function=getInspectionLog req.params.inspectionLogID=' + inspectionLogID);
    try {
        const inspectionLog = await InspectionLog.findById(inspectionLogID).exec();
        winston.debug('Fetched an Inspection Log from database=' + JSON.stringify(inspectionLog));
        res.status(200).json(inspectionLog);
    } catch (err) {
        winston.error('Get Inspection Log Error=' + err);
        err = new ErrorHandler(404, 'Failed to get Inspection Log=' + inspectionLogID);
        return next(err);
    }
};

const editInspectionLog = async (req, res, next) => {
    const inspectionLogID = req.params.inspectionLogID;
    winston.info('Function=editInspectionLog req.params.inspectionLogID=' + inspectionLogID);
    try {
        const inspectionLog = await InspectionLog.findById(inspectionLogID).exec();
        winston.debug('Fetched a InspectionLog from database to Edit=' + inspectionLogID);
        winston.info('req.body.timestamp=' + req.body.timestamp + ' inspectionLog.timestamp=' + inspectionLog.timestamp);

        if (inspectionLog.timestamp != req.body.timestamp) {
            throw new ErrorHandler(404, "The Inspection Log had been edited by others.");
        }
    } catch (err) {
        winston.error('Edit Inspection Log Error=' + err);
        return next(err);
    }

    try {
        const editedInspectionLog = await InspectionLog.updateOne({ _id: inspectionLogID }, {
            timestamp: Date.now(),
            gate: req.body.gate,
            date_inspection: req.body.date_inspection,
            question: req.body.question
        });
        //silly inspectionLog
        winston.silly('Edited Inspection Log='+editedInspectionLog);
        //verbose timestamp | gate | date_inspection
        winston.verbose('timestamp='+editedInspectionLog.timestamp+' gate='+editedInspectionLog.name+' date_inspection='+editedInspectionLog.date_inspection);

        res.status(200).json(editedInspectionLog);
    }
    catch (err) {
        winston.error('Edit Inspection Log Error='+err);
        err = new ErrorHandler(500, 'Failed to edit the Inspection Log: '+inspectionLogID);
        return next(err);
    }
};

const deleteInspectionLog = async (req, res) => {
    const inspectionLogID = req.params.inspectionLog;
    winston.info('Function=deleteInspectionLog req.params.inspectionLogID='+inspectionLogID);

    try {
        const deleteResult = await InspectionLog.deleteOne({ _id: req.params.inspectionLogID }).exec();
        winston.info('Deleted Inspection Log='+inspectionLogID);
        res.status(200).json(deleteResult);
    } catch (err) {
        winston.error('Delete Inspection Log Error='+err);
        err = new ErrorHandler(500, 'Failed to delete the Inspection Log='+inspectionLogID);
        return next(err);
    }
};

module.exports = {
    getInspectionLogs,
    addInspectionLog,
    getInspectionLog,
    editInspectionLog,
    deleteInspectionLog,
    getForm
};