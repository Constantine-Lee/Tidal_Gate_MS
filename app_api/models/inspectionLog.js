const mongoose = require('mongoose');

const inspectionLogSchema = new mongoose.Schema({    
    timestamp: Number,
    gate: String,
    date_inspection: String, 
    question: String,
});

mongoose.model('InspectionLog', inspectionLogSchema);