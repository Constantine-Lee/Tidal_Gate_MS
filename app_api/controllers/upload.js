const winston = require('../config/winston');
const fs = require('fs');

const uploadImage = async (req, res, next) => {
    winston.info('Function=uploadImage');
    try {        
        let base64Image = req.body.base64String.split(';base64,').pop();
        fs.writeFile('images/image.jpg', base64Image, { encoding: 'base64' }, function (err) {
            if(err){
                console.log(err);
            }
            console.log('File created');
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