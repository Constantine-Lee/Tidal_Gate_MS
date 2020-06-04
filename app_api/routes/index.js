const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const multer = require('multer')
const path = require('path');
const winston = require('../config/winston');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

const ctrlAuth = require('../controllers/authentication');
const ctrlUser = require('../controllers/user');
const ctrlInspect = require('../controllers/inspectionLog');
const ctrlMaintain = require('../controllers/maintenanceLog');
const ctrlGate = require('../controllers/gate');
const ctrlCounter = require('../controllers/counter');


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

const upload = multer({
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

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/users', ctrlUser.getUsers);
router.delete('/users/:userID', ctrlUser.deleteUser);

router
    .route('/counters')
    .get(ctrlCounter.getCounters)
    .post(ctrlCounter.addCounter)

router
    .route('/counters/:counterID')
    .get(ctrlCounter.getCounter)
    .put(ctrlCounter.editCounter)
    .delete(ctrlCounter.deleteCounter)

router
    .route('/inspectionLogs/:inspectionLogID')
    .get(ctrlInspect.getInspectionLog)
    .put(ctrlInspect.editInspectionLog)
    .delete(ctrlInspect.deleteInspectionLog)

router
    .route('/inspectionLogs')
    .get(ctrlInspect.getInspectionLogs)
    .post(ctrlInspect.addInspectionLog)

router
    .route('/maintenanceLogs/:maintenanceLogID')
    .get(ctrlMaintain.getMaintenanceLog)
    .put(ctrlMaintain.editMaintenanceLog)
    .delete(ctrlMaintain.deleteMaintenanceLog)

router
    .route('/maintenanceLogs')
    .get(ctrlMaintain.getMaintenanceLogs)
    .post(ctrlMaintain.addMaintenanceLog)

router
    .route('/gates/:gateID')
    .get(ctrlGate.getGate)
    .put(upload.single('image'), ctrlGate.editGate)
    .delete(ctrlGate.deleteGate)

router
    .route('/gates')
    .get(ctrlGate.getGates)
    .post(upload.single('image'), ctrlGate.addGate)

module.exports = router;