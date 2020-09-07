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

var textQuestionSchema = new Schema({}, { _id: false });
textQuestionSchema.add(baseQuestionSchema);

var dropDownQuestionSchema = new Schema({
  options: []
}, { _id: false });
dropDownQuestionSchema.add(baseQuestionSchema);

var dateQuestionSchema = new Schema({
  value: { type: Date, default: Date.now }
}, { _id: false });
dateQuestionSchema.add(baseQuestionSchema);

var categoryLabelSchema = new Schema({}, { _id: false });
categoryLabelSchema.add(baseQuestionSchema);

module.exports = {
  baseQuestionSchema,
  textQuestionSchema,
  dropDownQuestionSchema,
  dateQuestionSchema,
  categoryLabelSchema
}






