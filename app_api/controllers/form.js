const mongoose = require('mongoose');
const Form = mongoose.model('form');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const getForm = async (req, res, next) => {    
    winston.info('Function=getForm req.params.formID=' + req.params.formID);
    const formID = req.params.formID;
    try{
        const form = await Form.findOne({ _id: formID }).select('questions').exec();
        winston.silly(form);       

        res.status(200).json(form.questions);
    } catch (err) {
        winston.error('Get Form Error=' + err);
        err - new ErrorHandler(404, 'Failed to get Form.');
        return next(err);
    }
}

module.exports = {
    getForm
};