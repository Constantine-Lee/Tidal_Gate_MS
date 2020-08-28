const mongoose = require('mongoose');
const baseQuestionSchema = require('./form');

//Gate
const gateSchema = new mongoose.Schema({
  id: String,
  profilePhoto: String,
  timestamp: Number,
  questions: [baseQuestionSchema]
});

var docArray = gateSchema.path('questions');

var textQuestionSchema = new mongoose.Schema({

}, { _id: false });

var categoryLabelSchema = new mongoose.Schema({

}, { _id: false });

var fullTextBoxSchema = new mongoose.Schema({

}, { _id: false });

var TextboxQuestion = docArray.discriminator('textbox', textQuestionSchema);
var CategoryLabel = docArray.discriminator('groupLabel', categoryLabelSchema);
const FullTextboxQuestion = docArray.discriminator('fullTextbox', fullTextBoxSchema);

mongoose.model('Gate', gateSchema);

//Counter
const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: { Number, default: 0 }
});
const counter = mongoose.model('Counter', CounterSchema);

//Inspection Log
const inspectionLogSchema = new mongoose.Schema({
  id: Number,
  timestamp: Number,
  gate: String,
  date_inspection: String,
  question: String,
});
inspectionLogSchema.pre('save', function (next) {
  var doc = this;
  counter.findByIdAndUpdate({ _id: 'inspectionLog' }, { $inc: { seq: 1 } }, function (error, counter) {
    if (error)
      return next(error);
    doc.id = counter.seq;
    next();
  });
});
mongoose.model('InspectionLog', inspectionLogSchema);

//Maintenance Log
const maintenanceLogSchema = new mongoose.Schema({
  id: Number,
  timestamp: Number,
  gate: String,
  date_maintenance: String,
  action_taken: String,
  action_needed: String,
  question: String
});
maintenanceLogSchema.pre('save', function (next) {
  var doc = this;
  counter.findByIdAndUpdate({ _id: 'maintenanceLog' }, { $inc: { seq: 1 } }, function (error, counter) {
    if (error)
      return next(error);
    doc.id = counter.seq;
    next();
  });
});
mongoose.model('MaintenanceLog', maintenanceLogSchema);

