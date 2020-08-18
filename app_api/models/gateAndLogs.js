const mongoose = require('mongoose');

const gateSchema = new mongoose.Schema({
  id: String, 
  name: {
    type: String,
    required: true
  },
  profilePhoto: String,
  timestamp: Number,
  question: String
});
mongoose.model('Gate', gateSchema);

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

