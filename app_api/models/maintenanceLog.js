const mongoose = require('mongoose');

const maintenanceLogSchema = new mongoose.Schema({    
    timestamp: Number,
    gate: String,
    date_maintenance: String,
    action_taken: String,
    action_needed: String,
    question: String
});

mongoose.model('MaintenanceLog', maintenanceLogSchema);