const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUsers = async (req, res) => {
    console.log('Get Users. ');
    try {
        const results = await User.find().exec();
        console.log('Fetched Users.');
        res.status(200).json(results);
    } catch (err) {
        console.log('Failed to fetch Users: ' + err);
        res.status(404).json(err);
    }
};
/*
const addInspectionLog = async (req, res) => {
    console.log('Post a InspectionLog: ' + JSON.stringify(req.body));
    // a document instance
    const inspectionLog = new User({
        timestamp: Date.now(),
        gate: req.body.gate,
        date_inspection: req.body.date_inspection,
        question: req.body.question
    });
    // save model to database
    try {
        const saved = await inspectionLog.save();
        console.log('Saved a InspectionLog: ' + JSON.stringify(inspectionLog));
        res.status(200).json(saved);
    } catch (err) {
        console.log('Failed to save a InspectionLog: ' + err);
        res.status(404).json(err);
    }
};

const getInspectionLog = async (req, res) => { 
    console.log('Get a InspectionLog: ' + JSON.stringify(req.params.inspectionLogID));
    try {
        const result = await User.findById(req.params.inspectionLogID).exec();
        console.log('Fetched a InspectionLog: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to fetch a InspectionLog: ' + err);
        res.status(404).json(err);
    }    
};

const editInspectionLog = async (req, res) => { 
    console.log('Edit a InspectionLog: ' + JSON.stringify(req.params.inspectionLogID));
    try {
        const result = await User.findById(req.params.inspectionLogID).exec();

        if(result.timestamp != req.body.timestamp){
            throw new Error("The log had been edited by others.");
        }

        const edited = await User.updateOne({_id: req.params.inspectionLogID}, { 
            timestamp: Date.now(),
            gate: req.body.gate,
            date_inspection: req.body.date_inspection,
            question: req.body.question
        });        
        console.log('Edited a InspectionLog: ' + JSON.stringify(edited));
        res.status(200).json(edited);
    } catch (err) {
        console.log('Failed to edit a InspectionLog: ' + err);
        res.status(404).json(err);
    }    
};*/

const deleteUser = async (req, res) => { 
    console.log('Delete a User: ' + JSON.stringify(req.params.userID));
    try {
        const result = await User.deleteOne({_id:req.params.userID}).exec();
        console.log('Deleted a User: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to delete a User: ' + err);
        res.status(404).json(err);
    }    
};

module.exports = {
    getUsers,
    deleteUser
};