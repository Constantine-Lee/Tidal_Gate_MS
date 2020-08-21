require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const winston = require('./app_api/config/winston');

require('./app_api/models/');

require('./app_api/config/passport');
const { handleError } = require('./app_api/models/error');

const apiRouter = require('./app_api/routes/index');

const app = express();

app.use(morgan('combined', { stream: winston.stream }));

app.use(express.json({ 
  limit: '10mb'}));
app.use(express.urlencoded({ 
  limit: '10mb',
  extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_public', 'build')));
app.use(passport.initialize());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

//Serves all the request which includes /images in the url from Images folder
app.use('/api/images', express.static(__dirname + '/images'));

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
app.use( (err, req, res, next) => {
  console.log('2'+err.error);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`Final Error Handler: ${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  // render the error page
  handleError(err, res);
  //res.status(err.status || 500).json(err.message);
  
});


app.listen(3000, () => console.log(`listening at http://localhost:3000`))

module.exports = app;