const mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/und',  {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    var eventSchema = new Schema({ 
        value: String,
        key: String,
        label: String,
        required: Boolean,
        order: Number,
        controlType: String,
        type: String,
        },
        { discriminatorKey: 'kind', _id: false });
      
      var batchSchema = new Schema({ events: [eventSchema] });

      var docArray = batchSchema.path('events');

      var textSchema = new Schema({      
        }, { _id: false });

      var Text = docArray.discriminator('Text', textSchema);

      var Date = docArray.discriminator('Date', new Schema({
          }, { _id: false }));
      
      var Batch = db.model('EventBatch', batchSchema);
      
      // Create a new batch of events with different kinds
      var batch = {
        events: [
            {
                kind: 'Text',
                key: 'Nama Penjaga',
                label: 'Nama Penjaga',
                value: '',
                required: true,
                order: 0
            },
            {
                kind: 'Date',
                key: '1. Struktur Pintu',
                label: '1. Struktur Pintu',
                value: '',
                required: false,
                order: 1
            }
        ]
      };
      
      Batch.create(batch).
        then(function(doc) {      
          //doc.events.push({ kind: 'Purchased', product: 'action-figure-2' });
          //return doc.save();
        }).
        then(function(doc) {          
        }).
        catch();
});
