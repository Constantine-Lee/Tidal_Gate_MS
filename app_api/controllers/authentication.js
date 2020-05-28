const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error')

const register = (req, res, next) => {

  winston.info('Function=register');
  winston.info('req.body.username='+req.body.username);
  if (!req.body.username || !req.body.password) {
    const err = new ErrorHandler(400, "All fields required");
    return next(err);    
    /*
    return res.status(400).json({"message": "All fields required"});*/
  }

  const user = new User();
  user.username = req.body.username; 
  user.role = req.body.role; 
  user.setPassword(req.body.password);
  winston.info('username='+user.username+' role='+user.role);

  user.save((err) => {
    if (err) {
      const error = new ErrorHandler(400, err);
      next(error);
    } else {
      const token = user.generateJwt(), id = user._id, username = user.username, role = user.role;
      winston.info('Saved User into database: id='+id+' username='+username+' role='+role);      
      res.status(200).json({id, username, role, token});
    }
  })
};

const login = (req, res, next) => {
  winston.info('Function=login');
  winston.info('req.body.username='+req.body.username);  
  if (!req.body.username || !req.body.password) {    
    const err = new ErrorHandler(400, "All fields required");
    return next(err); 
  }
  passport.authenticate('local', (err, user, info) => {    
    if (err) {      
      const error = new ErrorHandler(404, err);
      return next(error);      
      //return res.status(404).json(err);
    }
    if (user) {      
      const token = user.generateJwt(), id = user._id, username = user.username, role = user.role;
      winston.info('Found User: id='+id+' username='+username+' role='+role);  
      res.status(200).json({id, username, role, token});
    } else {      
      res.status(401).json(info);
    }
  })
  (req, res, next);
};

module.exports = {
  register,
  login
};