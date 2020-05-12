const mongoose = require('mongoose');
const counter = require('./counter');

const inspectionLogSchema = new mongoose.Schema({   
    id: Number, 
    timestamp: Number,
    gate: String,
    date_inspection: String, 
    question: String,
});

inspectionLogSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'inspectionLog'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.id = counter.seq;
        next();
    });
});

mongoose.model('InspectionLog', inspectionLogSchema);