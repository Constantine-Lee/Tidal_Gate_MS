const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const multer = require('multer')
const path = require('path');
const winston = require('../config/winston');
const controller = require('../controllers');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

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

router
    .route('/upload')
    .post(controller.upload.uploadImage);

router.post('/register', controller.auth.register);
router.post('/login', controller.auth.login);
router.get('/users', controller.user.getUsers);
router.delete('/users/:userID', controller.user.deleteUser);

router
    .route('/counters')
    .get(controller.counter.getCounters)
    .post(controller.counter.addCounter)

router
    .route('/counters/:counterID')
    .get(controller.counter.getCounter)
    .put(controller.counter.editCounter)
    .delete(controller.counter.deleteCounter)

router
    .route('/inspectionLogs/:inspectionLogID')
    .get(controller.inspectionLog.getInspectionLog)
    .put(controller.inspectionLog.editInspectionLog)
    .delete(controller.inspectionLog.deleteInspectionLog)

router
    .route('/inspectionLogs')
    .get(controller.inspectionLog.getInspectionLogs)
    .post(controller.inspectionLog.addInspectionLog)

router
    .route('/form/:formID')
    .get(controller.form.getForm)

router
    .route('/maintenanceLogs/:maintenanceLogID')
    .get(controller.maintenanceLog.getMaintenanceLog)
    .put(controller.maintenanceLog.editMaintenanceLog)
    .delete(controller.maintenanceLog.deleteMaintenanceLog)

router
    .route('/maintenanceLogs')
    .get(controller.maintenanceLog.getMaintenanceLogs)
    .post(controller.maintenanceLog.addMaintenanceLog)

router
    .route('/gates/:gateID')
    .get(controller.gate.getGate)
    .put(upload.single('image'), controller.gate.editGate)
    .delete(controller.gate.deleteGate)

router
    .route('/gates')
    .get(controller.gate.getGates)
    .post(upload.single('image'), controller.gate.addGate)

module.exports = router;