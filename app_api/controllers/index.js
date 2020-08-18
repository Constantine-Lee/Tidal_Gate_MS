module.exports = {
    auth: require('../controllers/authentication'),
    user: require('../controllers/user'),
    inspectionLog: require('../controllers/inspectionLog'),
    maintenanceLog: require('../controllers/maintenanceLog'),
    gate: require('../controllers/gate'),
    counter: require('../controllers/counter'),
    form: require('../controllers/form'),
}