const mongoose = require('mongoose');
const MaintenanceLog = mongoose.model('MaintenanceLog');

const getMaintenanceLogs = async (req, res) => {
    console.log('Get MaintenanceLogs. ');
    try {
        const results = await MaintenanceLog.find().exec();
        console.log('Fetched MaintenanceLogs.');
        res.status(200).json(results);
    } catch (err) {
        console.log('Failed to fetch MaintenanceLogs: ' + err);
        res.status(404).json(err);
    }
};

const addMaintenanceLog = async (req, res) => {
    console.log('Post a MaintenanceLog: ' + JSON.stringify(req.body));
    // a document instance
    const maintenanceLog = new MaintenanceLog({
        timestamp: Date.now(),
        gate: req.body.gate,
        date_maintenance: req.body.date_maintenance,
        action_taken: req.body.action_taken,
        action_needed: req.body.action_needed,
        question: req.body.question
     });
    // save model to database
    try {
        const saved = await maintenanceLog.save();
        console.log('Saved a MaintenanceLog: ' + JSON.stringify(maintenanceLog));
        res.status(200).json(saved);
    } catch (err) {
        console.log('Failed to save a MaintenanceLog: ' + err);
        res.status(404).json(err);
    }
};

const getMaintenanceLog = async (req, res) => { 
    console.log('Get a MaintenanceLog: ' + JSON.stringify(req.params.maintenanceLogID));
    try {
        const result = await MaintenanceLog.findById(req.params.maintenanceLogID).exec();
        console.log('Fetched a MaintenanceLog: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to fetch a MaintenanceLog: ' + err);
        res.status(404).json(err);
    }    
};

const editMaintenanceLog = async (req, res) => { 
    console.log('Edit a MaintenanceLog: ' + JSON.stringify(req.params.maintenanceLogID));
    try {
        const result = await MaintenanceLog.findById(req.params.maintenanceLogID).exec();

        if(result.timestamp != req.body.timestamp){
            throw new Error("The log had been edited by others.");
        }

        const edited = await MaintenanceLog.updateOne({_id: req.params.maintenanceLogID}, { 
            timestamp: Date.now(),
            gate: req.body.gate,
            date_maintenance: req.body.date_maintenance,
            action_taken: req.body.action_taken,
            action_needed: req.body.action_needed,
            question: req.body.question
        });        
        console.log('Edited a MaintenanceLog: ' + JSON.stringify(edited));
        res.status(200).json(edited);
    } catch (err) {
        console.log('Failed to edit a MaintenanceLog: ' + err);
        res.status(404).json(err);
    }    
};

const deleteMaintenanceLog = async (req, res) => { 
    console.log('Delete a MaintenanceLog: ' + JSON.stringify(req.params.maintenanceLogID));
    try {
        const result = await MaintenanceLog.deleteOne({_id:req.params.maintenanceLogID}).exec();
        console.log('Deleted a MaintenanceLog: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to delete a MaintenanceLog: ' + err);
        res.status(404).json(err);
    }    
};

module.exports = {
    getMaintenanceLogs,
    addMaintenanceLog,
    getMaintenanceLog,
    editMaintenanceLog,
    deleteMaintenanceLog
};