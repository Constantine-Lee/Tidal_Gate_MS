const winston = require('../config/winston');
const AWS = require('aws-sdk');
const fs = require('fs');
const crypto = require('crypto');
const { FileIndex, ImageRefCounter } = require('../models/fileIndexing');

var s3 = new AWS.S3();
//configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey:process.env.S3_SECRET 
  });

const uploadImage = async (req, res, next) => {
    winston.info('Function=uploadImage req.body.id: ' + req.body.id);

    try {
        let base64Image = Buffer.from(req.body.base64String.split(';base64,').pop(), 'base64');
        const md5sum = crypto.createHash('md5').update(base64Image).digest('hex');

        //configuring parameters
        var params = {
            Bucket: 'tidalgate-ms',
            Body: base64Image,
            ContentEncoding: 'base64', // required
            ContentType: `image/jpg`, // required. Notice the back ticks
            Key: 'images/' + md5sum + '.jpg'
        };

        s3.upload(params, async (err, data) => {
            if (err) {
                winston.error(err);
                throw new ErrorHandler(404, 'Failed to upload image.');
            }
            if (data) {
                winston.info('File created: ' + data.Location.split('images/').pop());
                let imageRefCounter = await ImageRefCounter.findById(req.body.id).select('-__v').lean();

                //insert into images array if not existed, update ImageRefCounter and increment FileIndex

                if (!imageRefCounter.images.includes(data.Location.split('images/').pop())) {
                    imageRefCounter.images.push(data.Location.split('images/').pop());
                    Promise.all([
                        ImageRefCounter.findByIdAndUpdate({ _id: req.body.id }, imageRefCounter, { new: true }).lean(),
                        FileIndex.findByIdAndUpdate({ _id: data.Location.split('images/').pop() }, { $inc: { pointer: 1 } }, { new: true, upsert: true }).lean()
                    ]).then(([iRC, fI]) => { 
                        winston.verbose('updated Image Reference Counter: ' + JSON.stringify(iRC, null, 2)); 
                        winston.verbose('updated File Index: ' + JSON.stringify(fI, null, 2)); });
                }
                res.status(200).json(data.Location.split('images/').pop());
            }
            else {
                throw new ErrorHandler(404, 'Probably Database Error.');
            }
        });

    } catch (err) {
        winston.error('Upload Image Error=' + err);
        err = new ErrorHandler(404, 'Failed to upload image.');
        return next(err);
    }
};

module.exports = {
    uploadImage
};