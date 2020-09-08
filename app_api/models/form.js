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

let refGateQuestionSchema = new Schema({ _id: false }).add(baseQuestionSchema);

var dateQuestionSchema = new Schema({ _id: false }).add(baseQuestionSchema).add({
  value: { type: Date, default: Date.now }
}, );

var categoryLabelSchema = new Schema({}, { _id: false });
categoryLabelSchema.add(baseQuestionSchema);

module.exports = {
  baseQuestionSchema,
  textQuestionSchema,
  dropDownQuestionSchema,
  dateQuestionSchema,
  categoryLabelSchema,
  refGateQuestionSchema
}






