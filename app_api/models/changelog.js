const mongoose = require('mongoose');

var ChangelogSchema = new mongoose.Schema({
    create: { type: Date, expires:'25m', default: Date.now },
    timestamp: { type: Date, default: Date.now },
    userName: String,
    userID: String,
    userRole: String,
    action: String,
    subjectType: String,
    subjectID: String,
    subjectMongoID: String,
    subjectLinkTo: String
});

module.exports = {
    ChangelogSchema
}
