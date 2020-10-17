const mongoose = require('mongoose');
const Form = mongoose.model('form');
const winston = require('../config/winston');
const Gate = mongoose.model('Gate');
const { ErrorHandler } = require('../models/error')
const { FileIndex, ImageRefCounter } = require('../models/fileIndexing');


const getForm = async (req, res, next) => {
  winston.info('Function=getForm req.params.formID=' + req.params.formID);
  const formID = req.params.formID;
  try {
    let dateOffset = (24*60*60*1000) * 1; // 1 day
    let date = Date.now();    
    const imageRefCounter = await ImageRefCounter.create({ timestamp: date - dateOffset });
    winston.info('ImageRefCounter: ' + imageRefCounter);

    Promise.all([
      Gate.aggregate([
        { $match: {} },
        { $project: { "key": "$_id", "value": "$gateName.value", "_id": 0 } }
      ]),
      Form.findOne({ _id: formID }).select('-__v').lean()
    ]).then(([gate, form]) => {    
      if(req.params.formID == 'inspectionLogForm'){
        if(req.user.role == 'User'){
          form.testedBy.value = req.user.username;
          form.testedBy.controlType = "disabled";
          form.reviewedBy.controlType = "disabled";
          form.approvedBy.controlType = "disabled";
        }        
        form.lokasiPintuAir.options = gate;
      }  
      else if(req.params.formID == 'maintenanceLogForm'){
        form.gateName.options = gate;
      }
      
      let questions = [];
      const keys = Object.keys(form);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!['_id', 'profilePhoto', 'id', 'timestamp'].includes(key)) {
          questions.push(form[key]);
          delete form[key];
        }
      }
      form.questions = questions;
      
      form._id = imageRefCounter._id;
      res.status(200).json(form);
    });

  } catch (err) {
    winston.error('Get Form Error=' + err);
    err - new ErrorHandler(404, 'Failed to get Form.');
    return next(err);
  }
}

module.exports = {
  getForm
};