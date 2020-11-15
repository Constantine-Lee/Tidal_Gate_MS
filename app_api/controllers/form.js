const mongoose = require('mongoose');
const winston = require('../config/winston');
const Gate = mongoose.model('Gate');
const { ErrorHandler } = require('../models/error');
const { ImageRefCounter } = require('../models/fileIndexing');

const {
  Form } = require('../models/gateAndLogs');


const getForm = async (req, res, next) => {
  winston.info('Function=getForm req.params.formID=' + req.params.formID);
  const formID = req.params.formID;
  try {

    let date = new Date();
    let todayDate = new Date(date.getTime() + (8 * 60 * 60 * 1000) * 1);

    //testing purpose, create it with 1 day ago
    //const imageRefCounter = await ImageRefCounter.create({ timestamp: todayDate - (24*60*60*1000) * 1 });

    const imageRefCounter = await ImageRefCounter.create({ timestamp: todayDate });
    winston.info('ImageRefCounter: ' + imageRefCounter);

    Promise.all([
      // need to fetch the possible gate name
      Gate.aggregate([
        { $match: {} },
        { $project: { "key": "$_id", "value": "$gateName.value", "_id": 0 } }
      ]),
      Form.findOne({ schemaOf: formID }).select('-__v').lean()
    ]).then(([gate, form]) => {
      if (req.params.formID == 'inspectionLogForm') {
        if (req.user.role == 'User') {
          form.testedBy.value = req.user.username;
          form.testedBy.controlType = "disabled";
          form.reviewedBy.controlType = "disabled";
          form.approvedBy.controlType = "disabled";
        }
        form.lokasiPintuAir.options = gate;
        form.tarikh.value = todayDate;
      }
      else if (req.params.formID == 'maintenanceLogForm') {
        if (req.user.role == 'User') {
          form.testedBy.value = req.user.username;
          form.testedBy.controlType = "disabled";
          form.reviewBy.controlType = "disabled";
          form.approveBy.controlType = "disabled";
        }
        form.gateName.options = gate;
        form.date.value = todayDate;
      }

      let questions = [];
      const keys = Object.keys(form);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!['schemaOf', '_id', 'profilePhoto', 'id', 'timestamp', 'version'].includes(key)) {
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
    err = new ErrorHandler(404, 'Failed to get Form.');
    return next(err);
  }
}

module.exports = {
  getForm
};