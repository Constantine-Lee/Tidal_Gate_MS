const mongoose = require('mongoose');
const Gate = mongoose.model('Gate');
const multer = require('multer')
const path = require('path');

const getGates = async (req, res) => {
    console.log('Get Gates. ');
    try {
        const results = await Gate.find().exec();
        const gates = results.map(gate => {            
            let {_id, id, name} = gate;
            return {_id, id, name};
        });
        console.log('Fetched Gates: ' + JSON.stringify(gates));
        res.status(200).json(gates);
    } catch (err) {
        console.log('Failed to fetch Gates: ' + err);
        res.status(404).json(err);
    }
};

const addGate = async (req, res) => {
    const filename = req.file.filename;
    console.log('Post a Gate: ' + JSON.stringify(req.body));
    if(req.fileValidationError == 'goes wrong on the mimetype'){
        res.status(415).json('goes wrong on the mimetype');
        return;
    }
    // a document instance
    const gate = new Gate({
        timestamp: Date.now(),
        name: req.body.name,
        profilePhoto: filename,
        question: req.body.question
     });
    // save model to database
    try {
        const saved = await gate.save();
        console.log('Saved a Gate: ' + JSON.stringify(gate));
        res.status(200).json(saved);
    } catch (err) {
        console.log('Failed to save a Gate: ' + err);
        res.status(404).json(err);
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
        if(result.timestamp != req.body.timestamp){
            throw new Error("The log had been edited by others.");
        }

        const edited = await Gate.updateOne({_id: req.params.gateID}, { 
            timestamp: Date.now(),
            name: req.body.name,
            profilePhoto: req.body.profilePhoto,
            question: req.body.question
        });        
        console.log('Edited a Gate: ' + JSON.stringify(edited));
        res.status(200).json(edited);
    } catch (err) {
        console.log('Failed to edit a Gate: ' + err);
        res.status(404).json(err);
    }    
};

const deleteGate = async (req, res) => { 
    console.log('Delete a Gate: ' + JSON.stringify(req.params.gateID));
    try {
        const result = await Gate.deleteOne({_id:req.params.gateID}).exec();
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