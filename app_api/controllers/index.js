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
const changelog = require('../controllers/changelog');

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
    .route('/gates/download/:gateID')
    .get(gate.download);

router
    .route('/inspectionLogs/download/:inspectionLogID')
    .get(passport.authenticate('jwt', { session: false }), inspectionLog.download);

router
    .route('/maintenanceLogs/download/:maintenanceLogID')
    .get(maintenanceLog.download);

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
    .get(passport.authenticate('jwt', { session: false }), counter.getCounter)
    .put(counter.editCounter)
    .delete(counter.deleteCounter)

router
    .route('/inspectionLogs/:inspectionLogID')
    .get(passport.authenticate('jwt', { session: false }), inspectionLog.getInspectionLog)
    .put(passport.authenticate('jwt', { session: false }), inspectionLog.editInspectionLog)
    .delete(passport.authenticate('jwt', { session: false }), inspectionLog.deleteInspectionLog)

router
    .route('/inspectionLogs')
    .get(passport.authenticate('jwt', { session: false }), inspectionLog.getInspectionLogs)
    .post(passport.authenticate('jwt', { session: false }), inspectionLog.addInspectionLog)

router
    .route('/form/:formID')
    .get(passport.authenticate('jwt', { session: false }), form.getForm)

router
    .route('/maintenanceLogs/:maintenanceLogID')
    .get(passport.authenticate('jwt', { session: false }), maintenanceLog.getMaintenanceLog)
    .put(passport.authenticate('jwt', { session: false }), maintenanceLog.editMaintenanceLog)
    .delete(passport.authenticate('jwt', { session: false }), maintenanceLog.deleteMaintenanceLog)

router
    .route('/maintenanceLogs')
    .get(maintenanceLog.getMaintenanceLogs)
    .post(passport.authenticate('jwt', { session: false }), maintenanceLog.addMaintenanceLog)

router
    .route('/gates/:gateID')
    .get(gate.getGate)
    .put(passport.authenticate('jwt', { session: false }), gate.editGate)
    .delete(passport.authenticate('jwt', { session: false }), gate.deleteGate)

router
    .route('/gates')
    .get(gate.getGates)
    .post(passport.authenticate('jwt', { session: false }), gate.addGate)

router
    .route('/changelogs')
    .get(changelog.getChangelog)

module.exports = router;