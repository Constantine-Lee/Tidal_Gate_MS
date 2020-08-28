const mongoose = require('mongoose');
const Form = mongoose.model('form');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const imageRefCounterSchema = new mongoose.Schema({
    counter: {
      type: Map,
      of: {
        location: String,
        ref: Number
      }
    }
  })

const ImageRefCounter = mongoose.model('ImageRefCounter', imageRefCounterSchema);

const getForm = async (req, res, next) => {    
    winston.info('Function=getForm req.params.formID=' + req.params.formID);
    const formID = req.params.formID;
    try{
        const imageRefCounter = await ImageRefCounter.create({});
        winston.info('ImageRefCounter: ' + imageRefCounter);
        const form = await Form.findOne({ _id: formID }).lean();

        winston.debug('before: ' + JSON.stringify(form, null, 2));
        form._id = imageRefCounter._id;
        winston.debug('after: ' + JSON.stringify(form, null, 2));     

        res.status(200).json(form);
    } catch (err) {
        winston.error('Get Form Error=' + err);
        err - new ErrorHandler(404, 'Failed to get Form.');
        return next(err);
    }
}

module.exports = {
    getForm
};