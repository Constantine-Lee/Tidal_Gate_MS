const mongoose = require('mongoose');
const Counter = mongoose.model('Counter');

const getCounters = async (req, res) => {
    console.log('Get Counters. ');
    try {
        const results = await Counter.find().exec();
        console.log('Fetched Counters.');
        res.status(200).json(results);
    } catch (err) {
        console.log('Failed to fetch Counters: ' + err);
        res.status(404).json(err);
    }
};

const addCounter = async (req, res) => {
    console.log('Post a Counter: ' + JSON.stringify(req.body).substring(0,150));
    // a document instance
    const counter = new Counter({
        _id: req.body.name,
        seq: req.body.seq
    });
    // save model to database
    try {        
        const saved = await counter.save();
        console.log('Saved a Counter: ' + JSON.stringify(counter).substring(0,150));
        res.status(200).json(saved);
    } catch (err) {
        console.log('Failed to save a Counter: ' + err);
        res.status(404).json(err);
    }
};

const getCounter = async (req, res) => { 
    console.log('Get a Counter: ' + JSON.stringify(req.params.counterID));
    try {
        const result = await Counter.findById(req.params.counterID).exec();
        console.log('Fetched a Counter: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to fetch a Counter: ' + err);
        res.status(404).json(err);
    }    
};

const editCounter = async (req, res) => { 
    console.log('Edit a Counter: ' + JSON.stringify(req.params.counterID));
    try {
        const edited = await Counter.updateOne({_id: req.params.counterID}, { 
            _id: req.body.name,
            seq: req.body.seq
        });        
        console.log('Edited a Counter: ' + JSON.stringify(edited));
        res.status(200).json(edited);
    } catch (err) {
        console.log('Failed to edit a Counter: ' + err);
        res.status(404).json(err);
    }    
};

const deleteCounter = async (req, res) => { 
    console.log('Delete a Counter: ' + JSON.stringify(req.params.counterID));
    try {
        const result = await Counter.deleteOne({_id:req.params.counterID}).exec();
        console.log('Deleted a Counter: ' + JSON.stringify(result));
        res.status(200).json(result);
    } catch (err) {
        console.log('Failed to delete a Counter: ' + err);
        res.status(404).json(err);
    }    
};

module.exports = {
    getCounters,
    addCounter,
    getCounter,
    editCounter,
    deleteCounter
};