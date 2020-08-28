const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var baseQuestionSchema = new Schema({
  key: String,
  controlType: String,
  order: Number,
  required: Boolean,
  label: String,
  value: String,
}, { discriminatorKey: 'controlType', _id: false });

var form = new Schema({
  _id: String,
  questions: [baseQuestionSchema]
});

mongoose.model('form', form);

module.exports = baseQuestionSchema;






