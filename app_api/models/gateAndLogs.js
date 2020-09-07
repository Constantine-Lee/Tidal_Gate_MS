const mongoose = require('mongoose');
const {
  baseQuestionSchema,
  textQuestionSchema,
  dropDownQuestionSchema,
  dateQuestionSchema,
  categoryLabelSchema,
  refGateQuestionSchema } = require('./form');

//Gate
const gateSchema = new mongoose.Schema({
  id: String,
  profilePhoto: String,
  timestamp: Number,
  gateInfo: baseQuestionSchema,
  gateName: baseQuestionSchema,
  gateID: baseQuestionSchema,
  mitigationScheme: baseQuestionSchema,
  longitude: baseQuestionSchema,
  lattitude: baseQuestionSchema,
  gateType: baseQuestionSchema,
  noOfBays: baseQuestionSchema,
  SCADACommisionYear: baseQuestionSchema,
  SCADACommisionMonth: baseQuestionSchema,
  powerSourceType: baseQuestionSchema,
  actuatorsNSensors: baseQuestionSchema,
  actuatorBrand: baseQuestionSchema,
  actuatorModel: baseQuestionSchema,
  actuatorPower: baseQuestionSchema,
  sensorBrand: baseQuestionSchema,
  sensorController: baseQuestionSchema,
  sensorHead: baseQuestionSchema,
  SCADAComponents: baseQuestionSchema,
  PLC: baseQuestionSchema,
  HMIBrand: baseQuestionSchema,
  HMIType: baseQuestionSchema,
  HMIModel: baseQuestionSchema,
  RTUEmbedded: baseQuestionSchema,
  modemBrand: baseQuestionSchema,
  modemCommunication: baseQuestionSchema,
  modemConnectivity: baseQuestionSchema,
  modemPhoneNo: baseQuestionSchema,
  noOfModemAntennas: baseQuestionSchema,
  UPSBrandNModel: baseQuestionSchema,
  UPSBatteryType: baseQuestionSchema,
  UPSBatteryCapacity: baseQuestionSchema,
  controlSettings: baseQuestionSchema,
  sensorLvl4: baseQuestionSchema,
  sensorLvl20: baseQuestionSchema,
  sensorLvlOffset: baseQuestionSchema,
  gateDangerLvl: baseQuestionSchema,
  gateAlertLvl: baseQuestionSchema,
  gateControlSetpoint: baseQuestionSchema,
  SMSSettings: baseQuestionSchema,
  SMSLastSettings: baseQuestionSchema,
  SMSName1: baseQuestionSchema,
  no1: baseQuestionSchema,
  SMSName2: baseQuestionSchema,
  no2: baseQuestionSchema,
  SMSName3: baseQuestionSchema,
  no3: baseQuestionSchema,
  SMSName4: baseQuestionSchema,
  no4: baseQuestionSchema,
  SMSName5: baseQuestionSchema,
  no5: baseQuestionSchema,
  SMSName6: baseQuestionSchema,
  no6: baseQuestionSchema,
  SMSName7: baseQuestionSchema,
  no7: baseQuestionSchema,
  SMSName8: baseQuestionSchema,
  no8: baseQuestionSchema,
  SMSName9: baseQuestionSchema,
  no9: baseQuestionSchema,
  SMSName10: baseQuestionSchema,
  no10: baseQuestionSchema,
  operatorName: baseQuestionSchema,
  operatorPhone: baseQuestionSchema,
  solarPowerSupply: baseQuestionSchema,
  actuatorSolarChargeController: baseQuestionSchema,
  actuatorSolarUsage: baseQuestionSchema,
  actuatorSolarNoOfBatteries: baseQuestionSchema,
  actuatorSolarBatteryCapacity: baseQuestionSchema,
  actuatorInverterModel: baseQuestionSchema,
  actuatorInverterOutput: baseQuestionSchema,
  SCADASolarChargeController: baseQuestionSchema,
  SCADASolarNoOfBatteries: baseQuestionSchema,
  SCADASolarBatteryCapacity: baseQuestionSchema,
  SCADAInverterModel: baseQuestionSchema,
  SCADAInverterOutput: baseQuestionSchema,
  lastUpdateLogLabel: baseQuestionSchema,
  lastUpdateLog: baseQuestionSchema
});

mongoose.model('Gate', gateSchema);

//Counter
const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: { Number, default: 0 }
});
const counter = mongoose.model('Counter', CounterSchema);

//Inspection Log
const inspectionLogSchema = new mongoose.Schema({
  id: Number,
  timestamp: Number,
  namaPenjaga: textQuestionSchema,
  noRujukan: textQuestionSchema,
  lokasiPintuAir: refGateQuestionSchema,
  jenisGearbox: textQuestionSchema,
  tarikh: dateQuestionSchema,
  strukturPintu: categoryLabelSchema,
  huluPintuAir: dropDownQuestionSchema,
  hilirPintuAir: dropDownQuestionSchema,
  pentasOperasi: dropDownQuestionSchema,
  railPentasOperasi: dropDownQuestionSchema,
  tangga: dropDownQuestionSchema,
  tempatDudukPintu: dropDownQuestionSchema,
  railPintuAir: dropDownQuestionSchema,
  cadanganSP: textQuestionSchema,
  badanPintuAir: categoryLabelSchema,
  framePintuAir: dropDownQuestionSchema,
  batuSeimbang: dropDownQuestionSchema,
  blokBearing: dropDownQuestionSchema,
  sistemPelincir: dropDownQuestionSchema,
  sealGetah: dropDownQuestionSchema,
  cadanganBPA: textQuestionSchema,
  mekanismaP: categoryLabelSchema,
  tangkiHidrolik: dropDownQuestionSchema,
  minyak: dropDownQuestionSchema,
  sistemPaip: dropDownQuestionSchema,
  hos: dropDownQuestionSchema,
  enjinDiesel: dropDownQuestionSchema,
  motoHidrolik: dropDownQuestionSchema,
  pamHidrolik: dropDownQuestionSchema,
  penyukatT: dropDownQuestionSchema,
  valvePengankut: dropDownQuestionSchema,
  valveMenurun: dropDownQuestionSchema,
  penyedutTekanan: dropDownQuestionSchema,
  cadanganMknmPgkt: textQuestionSchema,
  umum: categoryLabelSchema,
  spindle: dropDownQuestionSchema,
  wire: dropDownQuestionSchema,
  clip: dropDownQuestionSchema,
  tumbuckle: dropDownQuestionSchema,
  cat: dropDownQuestionSchema,
  cadanganUmum: textQuestionSchema,
  railPL: categoryLabelSchema,
  kalisAir: dropDownQuestionSchema,
  kekuatan: dropDownQuestionSchema,
  karat: dropDownQuestionSchema,
  catPaint: dropDownQuestionSchema,
  cadanganRPLLabel: textQuestionSchema,
  fungsiAirPintu: categoryLabelSchema,
  pelinciranL: dropDownQuestionSchema,
  haus: dropDownQuestionSchema,
  kP: dropDownQuestionSchema,
  pDPGG: dropDownQuestionSchema,
  wireAngkut: dropDownQuestionSchema,
  cadanganRPLText: textQuestionSchema,
  miscellaneous: categoryLabelSchema,
  accessRoad: dropDownQuestionSchema,
  stickGauge: dropDownQuestionSchema,
  others: textQuestionSchema,
  aITS: dropDownQuestionSchema,
  TSASIR: categoryLabelSchema,
  testedBy: textQuestionSchema,
  witnessedBy: textQuestionSchema,
  reviewedBy: textQuestionSchema,
  approvedBy: textQuestionSchema
});
inspectionLogSchema.pre('save', function (next) {
  var doc = this;
  counter.findByIdAndUpdate({ _id: 'inspectionLog' }, { $inc: { seq: 1 } }, function (error, counter) {
    if (error)
      return next(error);
    doc.id = counter.seq;
    next();
  });
});
mongoose.model('InspectionLog', inspectionLogSchema);

//Maintenance Log
const maintenanceLogSchema = new mongoose.Schema({
  id: Number,
  timestamp: Number,
  gate: String,
  date_maintenance: String,
  action_taken: String,
  action_needed: String,
  question: String
});
maintenanceLogSchema.pre('save', function (next) {
  var doc = this;
  counter.findByIdAndUpdate({ _id: 'maintenanceLog' }, { $inc: { seq: 1 } }, function (error, counter) {
    if (error)
      return next(error);
    doc.id = counter.seq;
    next();
  });
});
mongoose.model('MaintenanceLog', maintenanceLogSchema);

