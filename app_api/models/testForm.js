const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var baseQuestionSchema = new Schema({
    key: String,
    controlType: String,
    order: Number,
    required: Boolean,
    label: String,
    value: String,
},
    { discriminatorKey: 'questionType', _id: false });

var batchSchema = new Schema({ questions: [baseQuestionSchema] });

mongoose.model('eventbatch', batchSchema);



