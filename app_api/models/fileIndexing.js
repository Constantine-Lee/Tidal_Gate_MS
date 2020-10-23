const mongoose = require('mongoose');

var fileIndex = new mongoose.Schema({
    _id: String,
    pointer: Number
});
const FileIndex = mongoose.model('FileIndex', fileIndex);

const imageRefCounterSchema = new mongoose.Schema({
    timestamp: { type: Date },
    submit: { type: Boolean, default: false},
    images: [String]
})
const ImageRefCounter = mongoose.model('ImageRefCounter', imageRefCounterSchema);

module.exports = {
    FileIndex,
    ImageRefCounter
}


