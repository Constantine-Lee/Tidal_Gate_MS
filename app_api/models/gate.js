const mongoose = require('mongoose');
const counter = require('./counter');

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

/*
gateSchema.pre('save', function(next) {
  var doc = this;
  counter.findByIdAndUpdate({_id: 'gate'}, {$inc: { seq: 1} }, function(error, counter)   {
      if(error)
          return next(error);
      doc.id = counter.seq;
      next();
  });
});
*/
mongoose.model('Gate', gateSchema);