const mongoose = require('mongoose');
const User = mongoose.model('User');
const winston = require('../config/winston');
const { ErrorHandler } = require('../models/error');

const getUsers = async (req, res, next) => {
    winston.info('Function=getUsers');
    try {
        const users = await User.find().exec();
        winston.debug('users='+JSON.stringify(users));
        res.status(200).json(users);
    } catch (err) {
        winston.error('Get Users Error='+err);
        err = new ErrorHandler(404, 'Failed to get Users.');
        return next(err);
    }
};

const deleteUser = async (req, res, next) => { 
    const userID = req.params.userID;
    winston.info('Function=deleteUser req.params.userID='+userID);

    try {
        const deleteResult = await User.deleteOne({_id:req.params.userID}).exec();
        winston.info('Deleted User='+userID);
        res.status(200).json(deleteResult);
    } catch (err) {
        winston.error('Delete User Error='+err);
        err= new ErrorHandler(500, 'Failed to delete User: '+userID);
        return next(err);
    }    
};

module.exports = {
    getUsers,
    deleteUser
};