//entry to server
require('dotenv').config();

const cron = require("node-cron");

const express = require('express');
const app = express();
app.use(express.json({
  limit: '10mb'
}));
app.use(express.urlencoded({
  limit: '10mb',
  extended: false
}));

//connect to the database and inititalize Schema
require('./app_api/models/databaseInit');

const path = require('path');
global.appRoot = path.resolve(__dirname);
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const winston = require('./app_api/config/winston');
const morgan = require('morgan');
app.use(morgan('combined', { stream: winston.stream }));

const passport = require('passport');
app.use(passport.initialize());
require('./app_api/config/passport');

const { handleError } = require('./app_api/models/error');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

//Serves all the request which includes /images in the url from Images folder
app.use('/api/images', express.static(__dirname + '/images'));

const apiRouter = require('./app_api/controllers');
app.use('/api', apiRouter);

app.get(/(\/home)|(\/login)|(\/admin)|(\/gate)|(\/addGate)|(\/updateGate\/[a-z0-9]{24})|(\/maintenanceLog)|(\/addMaintenanceLog)|(\/updateMaintenanceLog\/[a-z0-9]{24})|(\/inspectionLog)|(\/addInspectionLog)|(\/updateInspectionLog\/[a-z0-9]{24})/, function (req, res) {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

/*
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
*/

// error handler
app.use((err, req, res, next) => {
  console.log('err.error: ' + err.error);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`Final Error Handler: ${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  handleError(err, res);
  //res.status(err.status || 500).json(err.message);

});

const { FileIndex, ImageRefCounter } = require('./app_api/models/fileIndexing');
const fs = require('fs');


const AWS = require('aws-sdk');

let s3 = new AWS.S3();

// schedule tasks to be run on the server
cron.schedule("*/30 * * * *", function () {
  console.log("running a task every minute");

  let dateOffset = (24 * 60 * 60 * 1000) * 1; // 1 day
  // find non-submit ImageRefCounter, and FileIndex with NO Reference
  Promise.all([
    ImageRefCounter.find({ submit: false, timestamp: { $lt: Date.now() - dateOffset } }).lean(),
    FileIndex.find({ pointer: 0 }).select('-__v -pointer').lean()
  ]).then(([iRC, fI]) => {
    winston.info('NON-Submit imageRefCounter: ' + JSON.stringify(iRC, null, 2) + ', FileIndex with NO Reference: ' + JSON.stringify(fI, null, 2));

    //form an array from non-submit images
    let imgArr = [];
    for (let i = 0; i < iRC.length; i++) {
      for (let j = 0; j < iRC[i].images.length; j++) {
        winston.info('image: ' + iRC[i].images[j]);
        imgArr.push(iRC[i].images[j]);
      }
    }

    let deleteFileIndex = fI.map(image => image._id);
    deleteFileIndex.map(image => {
      let params = { Bucket: 'tidalgate-ms', Key: image.split('com/').pop() };
      s3.deleteObject(params, function (err, data) {
        if (err) console.log("Error Delete Object: " + err, err.stack); // an error occurred
        else console.log("Success Delete Object: " + JSON.stringify(data, null, 2));           // successful response
      })
    });

    // Delete FileIndex with NO Reference and decrement non-submit images by 1
    return Promise.all([
      FileIndex.update({ _id: imgArr }, { $inc: { pointer: -1 } }, { multi: true, new: true }).lean(),
      FileIndex.deleteMany({ _id: deleteFileIndex }),
      ImageRefCounter.deleteMany({ submit: false, timestamp: { $lt: Date.now() - dateOffset } })
    ])
  }).then(([fI]) => {
    winston.info('Updated FileIndex: ' + JSON.stringify(fI, null, 2));
  });
});

app.listen(3000, () => console.log(`listening at http://localhost:3000`))

module.exports = app;