const mongoose = require('mongoose');

var fileIndex = new mongoose.Schema({
    _id: String,
    keyValue: {
        type: Map,
        of: String
    }
});

mongoose.model('FileIndex', fileIndex);

