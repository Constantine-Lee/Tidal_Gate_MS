const mongoose = require('mongoose');
const winston = require('../config/winston');
const FileIndex = mongoose.model('FileIndex');
const fs = require('fs');
const crypto = require('crypto');



const uploadImage = async (req, res, next) => {
    winston.info('Function=uploadImage');
    try {        
        let base64Image = req.body.base64String.split(';base64,').pop();
        const md5sum = crypto.createHash('md5').update(base64Image).digest('hex');
        fs.writeFile('images/'+ md5sum + '.jpg', base64Image, { encoding: 'base64' }, function (err) {
            if(err){
                winston.error(err);
            }
            else {
                winston.info('File created: ' + md5sum);
            }           
        })
        res.status(200).json("Image upload success!");
    } catch (err) {
        winston.error('Upload Image Error=' + err);
        err = new ErrorHandler(404, 'Failed to upload image.');
        return next(err);
    }
};

module.exports = {
    uploadImage
};