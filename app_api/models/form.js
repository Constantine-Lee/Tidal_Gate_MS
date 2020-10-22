const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var baseQuestionSchema = new Schema({
  key: String,
  controlType: String,
  order: Number,
  required: Boolean,
  label: String,
  value: { type: String, default: ''}
}, { discriminatorKey: 'controlType', _id: false });

let uniqueTextFieldSchema = new Schema({ _id: false }).add(baseQuestionSchema).add({
  value: { type: String, index: { unique: true } }
});

var textQuestionSchema = new Schema({ _id: false }).add(baseQuestionSchema);

var dropDownQuestionSchema = new Schema({
  options: []
}, { _id: false });
dropDownQuestionSchema.add(baseQuestionSchema);

let refGateQuestionSchema = new Schema({ _id: false }).add(baseQuestionSchema);

var dateQuestionSchema = new Schema({ _id: false }).add(baseQuestionSchema).add({
  value: { type: Date, default: Date.now() }
});

var categoryLabelSchema = new Schema({}, { _id: false });
categoryLabelSchema.add(baseQuestionSchema);

let checkboxQuestionSchema = new Schema({ _id: false }).add(baseQuestionSchema).add({ checkboxes: [] });

let rtxQuestionSchema = new Schema({ _id: false }).add(baseQuestionSchema).add({ value: {} });

let fullTextBoxSchema = new Schema({ _id: false }).add(baseQuestionSchema);

module.exports = {
  baseQuestionSchema,
  textQuestionSchema,
  dropDownQuestionSchema,
  dateQuestionSchema,
  categoryLabelSchema,
  refGateQuestionSchema,
  checkboxQuestionSchema,
  rtxQuestionSchema,
  uniqueTextFieldSchema,
  fullTextBoxSchema
}






