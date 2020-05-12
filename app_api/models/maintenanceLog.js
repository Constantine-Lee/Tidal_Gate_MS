const mongoose = require('mongoose');
const counter = require('./counter');

const maintenanceLogSchema = new mongoose.Schema({    
    id: Number, 
    timestamp: Number,
    gate: String,
    date_maintenance: String,
    action_taken: String,
    action_needed: String,
    question: String
});

maintenanceLogSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'maintenanceLog'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.id = counter.seq;
        next();
    });
});

mongoose.model('MaintenanceLog', maintenanceLogSchema);