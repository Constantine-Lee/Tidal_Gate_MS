const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path');
const winston = require('../config/winston');
const passport = require('passport')

const auth = require('./authentication');
const user = require('../controllers/user');
const inspectionLog = require('../controllers/inspectionLog');
const maintenanceLog = require('../controllers/maintenanceLog');
const gate = require('../controllers/gate');
const counter = require('../controllers/counter');
const form = require('../controllers/form');
const upload = require('../controllers/upload');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        winston.info('storage filename Function.');

        //verbose
        const fileExtName = path.extname(file.originalname);
        winston.verbose('fileExtName=' + fileExtName);

        //verbose
        const timestamp = Date.now();
        winston.verbose('timestamp=' + timestamp);

        const fileName = 'gate-' + timestamp + fileExtName;        

        winston.verbose('fileName=' + fileName);
        cb(null, fileName);
    }
})

const multerUpload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        winston.info('fileFilter Function.')

        const fileExtName = path.extname(file.originalname);
        winston.verbose('fileExtName=' + fileExtName);

        if (fileExtName !== '.png' && fileExtName !== '.jpg' && fileExtName !== '.jpeg') {
            req.fileValidationError = true;
            return cb(null, false);
        }
        cb(null, true);
    }
})

router
    .route('/upload')
    .post(upload.uploadImage);

router
    .route('/download/:gateID')
    .get(gate.download);

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/users', user.getUsers);
router.delete('/users/:userID', user.deleteUser);

router
    .route('/counters')
    .get(counter.getCounters)
    .post(counter.addCounter)

router
    .route('/counters/:counterID')
    .get(counter.getCounter)
    .put(counter.editCounter)
    .delete(counter.deleteCounter)

router
    .route('/inspectionLogs/:inspectionLogID')
    .get(inspectionLog.getInspectionLog)
    .put(inspectionLog.editInspectionLog)
    .delete(inspectionLog.deleteInspectionLog)

router
    .route('/inspectionLogs')
    .get(inspectionLog.getInspectionLogs)
    .post(inspectionLog.addInspectionLog)

router
    .route('/form/:formID')
    .get(form.getForm)

router
    .route('/maintenanceLogs/:maintenanceLogID')
    .get(maintenanceLog.getMaintenanceLog)
    .put(maintenanceLog.editMaintenanceLog)
    .delete(maintenanceLog.deleteMaintenanceLog)

router
    .route('/maintenanceLogs')
    .get(passport.authenticate('jwt', { session: false }),maintenanceLog.getMaintenanceLogs)
    .post(maintenanceLog.addMaintenanceLog)

router
    .route('/gates/:gateID')
    .get(gate.getGate)
    .put(multerUpload.single('image'), gate.editGate)
    .delete(gate.deleteGate)

router
    .route('/gates')
    .get(gate.getGates)
    .post(multerUpload.single('image'), gate.addGate)

module.exports = router;