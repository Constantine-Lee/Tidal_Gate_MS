const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const multer = require('multer')
const path = require('path');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

const ctrlAuth = require('../controllers/authentication');
const ctrlUser = require('../controllers/user');
const ctrlInspect = require('../controllers/inspectionLog');
const ctrlMaintain = require('../controllers/maintenanceLog');
const ctrlGate = require('../controllers/gate');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        const fileExtName = path.extname(file.originalname);
        console.log(fileExtName);
        const timestamp = Date.now();
                
        cb(null, `gate-${timestamp}${fileExtName}`);
    }
})

const upload = multer({ storage: storage ,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        console.log(ext);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {            
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false);
        }
        console.log("success");
        cb(null, true);
    }
})

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/users', ctrlUser.getUsers);
router.delete('/users/:userID', ctrlUser.deleteUser);

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
    .put(ctrlGate.editGate)
    .delete(ctrlGate.deleteGate)

router
    .route('/gates')
    .get(ctrlGate.getGates)
    .post(upload.single('image'), ctrlGate.addGate)

module.exports = router;