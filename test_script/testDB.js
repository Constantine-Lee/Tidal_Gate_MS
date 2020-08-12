const mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;

const zero = 0;
const first = 1;
const second = 2;
const third = 3;
const fourth = 4;
const fifth = 5;
const sixth = 6;
const seventh = 7;
const eighth = 8;

mongoose.connect('mongodb://localhost/fyp', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
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

    var docArray = batchSchema.path('questions');

    var textQuestionSchema = new Schema({}, { _id: false });
    var dropDownQuestionSchema = new Schema({
        options: []
    }, { _id: false });
    var dateQuestionSchema = new Schema({}, { _id: false });

    var textQuestion = docArray.discriminator('TextQuestion', textQuestionSchema);
    var dropDownQuestion = docArray.discriminator('DropDownQuestion', dropDownQuestionSchema);
    var Date = docArray.discriminator('DateQuestion', dateQuestionSchema);

    var Batch = db.model('EventBatch', batchSchema);

    // Create a new batch of events with different kinds
    var batch = {
        questions: [
            new textQuestion(
                {
                    key: 'Nama Penjaga',
                    label: 'Nama Penjaga',
                    required: true,
                    order: zero
                }
            ),
            {
                questionType: 'TextQuestion',
                key: 'No. Rujukan',
                label: 'No. Rujukan',
                required: true,
                order: zero
            },
            {
                questionType: 'DropDownQuestion',
                key: 'Lokasi_Pintu_Air',
                label: 'Lokasi Pintu Air',
                options: [{ key: 'sdfd', value: 'uiui' }, { key: 'sdfyk', value: 'uqwi' }],
                required: true,
                order: zero,
            }
        ]
    };

    Batch.create(batch).
        then(function (doc) {
            //doc.events.push({ kind: 'Purchased', product: 'action-figure-2' });
            //return doc.save();
        }).
        then(function (doc) {
        }).
        catch();
});
