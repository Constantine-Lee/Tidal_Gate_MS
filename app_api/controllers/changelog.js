const mongoose = require('mongoose');
const { ChangelogSchema } = require('../models/changelog'); 
const Changelog = mongoose.model('Changelog', ChangelogSchema);
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const getChangelog = async (req, res, next) => {
    winston.info('Function=getChangelog');
    try {
        const changelogs = await Changelog.find().sort({timestamp: -1}).lean();
        winston.info('changelogs=' + JSON.stringify(changelogs));
        res.status(200).json(changelogs);
    } catch (err) {
        winston.error('Get Changelog Error (' + err.stack + ')');
        err = new ErrorHandler(404, 'Failed to get Changelogs.');
        return next(err);
    }
};

module.exports = {
    getChangelog
};