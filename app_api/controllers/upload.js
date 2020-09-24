const winston = require('../config/winston');
const fs = require('fs');
const crypto = require('crypto');
const { FileIndex, ImageRefCounter } = require('../models/fileIndexing');

const uploadImage = async (req, res, next) => {
    winston.info('Function=uploadImage req.body.id: ' + req.body.id);
    try {
        let base64Image = req.body.base64String.split(';base64,').pop();
        const md5sum = crypto.createHash('md5').update(base64Image).digest('hex');
        fs.writeFile('images/' + md5sum + '.jpg', base64Image, { encoding: 'base64' }, async (err) => {
            if (err) {
                winston.error(err);
            }
            else {
                winston.info('File created: ' + md5sum);
                let imageRefCounter = await ImageRefCounter.findById(req.body.id).select('-__v').lean();

                //insert into images array if not existed, update ImageRefCounter and increment FileIndex

                if (!imageRefCounter.images.includes(process.env.imgFolderUrl + md5sum + '.jpg')) {
                    imageRefCounter.images.push(process.env.imgFolderUrl + md5sum + '.jpg');
                    Promise.all([
                        ImageRefCounter.findByIdAndUpdate({ _id: req.body.id }, imageRefCounter, { new: true }).lean(),
                        FileIndex.findByIdAndUpdate({ _id: process.env.imgFolderUrl + md5sum + '.jpg' }, { $inc: { pointer: 1 } }, { new: true, upsert: true }).lean()
                    ]).then(([iRC, fI]) => { winston.info('updated imageRefCounter: ' + iRC + ', fileIndex' + fI); });
                }
            }
        });
        res.status(200).json(process.env.imgFolderUrl + md5sum + '.jpg');
    } catch (err) {
        winston.error('Upload Image Error=' + err);
        err = new ErrorHandler(404, 'Failed to upload image.');
        return next(err);
    }
};

module.exports = {
    uploadImage
};