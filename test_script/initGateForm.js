const mongoose = require('mongoose');

const { zero,
    first,
    second,
    third,
    fourth,
    fifth,
    sixth} = require('../app_api/models/CONSTANT');

const {
    baseQuestionSchema } = require('../app_api/models/form');

const {
    gateSchema } = require('../app_api/models/gateAndLogs');

mongoose.connect('mongodb://localhost/fyp', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    let textQuestionSchema = new mongoose.Schema({ _id: false });
    let categoryLabelSchema = new mongoose.Schema({ _id: false });
    let fullTextBoxSchema = new mongoose.Schema({ _id: false });

    var docArray = mongoose.model('BaseQuestion', baseQuestionSchema);
    var TextboxQuestion = docArray.discriminator('textbox', textQuestionSchema);
    var CategoryLabel = docArray.discriminator('groupLabel', categoryLabelSchema);
    const FullTextboxQuestion = docArray.discriminator('fullTextbox', fullTextBoxSchema);

    var form = db.model('form', gateSchema);

    // Create a new batch of events with different kinds
    var batch = {
        schemaOf: 'gateForm',
        profilePhoto: 'http://localhost:3000/api/images/uploadImage.png',
        gateInfo: new CategoryLabel({
            key: 'gateInfo',
            label: 'GATE INFORMATION',
            value: '',
            required: false,
            order: zero
        }),
        gateName: new TextboxQuestion({
            key: 'gateName',
            label: 'Gate Name',
            value: '',
            required: true,
            order: zero
        }),
        gateID: new TextboxQuestion({
            key: 'gateID',
            label: 'Gate ID',
            value: '',
            required: true,
            order: zero
        }),
        mitigationScheme: new TextboxQuestion({
            key: 'mitigationScheme',
            label: 'Mitigation Scheme(Location)',
            value: '',
            required: false,
            order: zero
        }),
        longitude: new TextboxQuestion({
            key: 'longitude',
            label: 'Longitude',
            value: '',
            required: false,
            order: zero
        }),
        lattitude: new TextboxQuestion({
            key: 'lattitude',
            label: 'Lattitude',
            value: '',
            required: false,
            order: zero
        }),
        gateType: new TextboxQuestion({
            key: 'gateType',
            label: 'Gate Type',
            value: '',
            required: false,
            order: zero
        }),
        noOfBays: new TextboxQuestion({
            key: 'noOfBays',
            label: 'Nos of bays',
            value: '',
            required: false,
            order: zero
        }),
        SCADACommisionYear: new TextboxQuestion({
            key: 'SCADACommisionYear',
            label: 'SCADA Commisioning Year',
            value: '',
            required: false,
            order: zero
        }),
        SCADACommisionMonth: new TextboxQuestion({
            key: 'SCADACommisionMonth',
            label: 'SCADA Commisioning Month',
            value: '',
            required: false,
            order: zero
        }),
        powerSourceType: new TextboxQuestion({
            key: 'powerSourceType',
            label: 'Power Source Type',
            value: '',
            required: false,
            order: zero
        }),
        actuatorsNSensors: new CategoryLabel({
            key: 'actuatorsNSensors',
            label: 'Actuators & Sensors',
            value: '',
            required: false,
            order: first
        }),
        actuatorBrand: new TextboxQuestion({
            key: 'actuatorBrand',
            label: 'Actuator Brand',
            value: '',
            required: false,
            order: first
        }),
        actuatorModel: new TextboxQuestion({
            key: 'actuatorModel',
            label: 'Actuator Model',
            value: '',
            required: false,
            order: first
        }),
        actuatorPower: new TextboxQuestion({
            key: 'actuatorPower',
            label: 'Actuator Power(kW)',
            value: '',
            required: false,
            order: first
        }),
        sensorBrand: new TextboxQuestion({
            key: 'sensorBrand',
            label: 'Sensor Brand',
            value: '',
            required: false,
            order: first
        }),
        sensorController: new TextboxQuestion({
            key: 'sensorController',
            label: 'Sensor Controller Model',
            value: '',
            required: false,
            order: first
        }),
        sensorHead: new TextboxQuestion({
            key: 'sensorHead',
            label: 'Sensor Head Model',
            value: '',
            required: false,
            order: first
        }),
        SCADAComponents: new CategoryLabel({
            key: 'SCADAComponents',
            label: 'SCADA Components',
            value: '',
            required: false,
            order: second
        }),
        PLC: new TextboxQuestion({
            key: 'PLC',
            label: 'PLC Brand',
            value: '',
            required: false,
            order: second
        }),
        PLCModel: new TextboxQuestion({
            key: 'PLCModel',
            label: 'PLC Model',
            value: '',
            required: false,
            order: second
        }),
        HMIBrand: new TextboxQuestion({
            key: 'HMI',
            label: 'HMI Brand',
            value: '',
            required: false,
            order: second
        }),
        HMIType: new TextboxQuestion({
            key: 'HMIType',
            label: 'HMI Type',
            value: '',
            required: false,
            order: second
        }),
        HMIModel: new TextboxQuestion({
            key: 'HMIModel',
            label: 'HMI Model',
            value: '',
            required: false,
            order: second
        }),
        RTUEmbedded: new TextboxQuestion({
            key: 'RTUEmbedded',
            label: 'RTU Embedded Model',
            value: '',
            required: false,
            order: second
        }),
        modemBrand: new TextboxQuestion({
            key: 'modemBrand',
            label: 'Modem Brand',
            value: '',
            required: false,
            order: second
        }),
        modemModel: new TextboxQuestion({
            key: 'modemModel',
            label: 'Modem Model',
            value: '',
            required: false,
            order: second
        }),
        modemCommunication: new TextboxQuestion({
            key: 'modemCommunication',
            label: 'Modem Communication',
            value: '',
            required: false,
            order: second
        }),
        modemConnectivity: new TextboxQuestion({
            key: 'modemConnectivity',
            label: 'Modem Connectivity',
            value: '',
            required: false,
            order: second
        }),
        modemPhoneNo: new TextboxQuestion({
            key: 'modemPhoneNo',
            label: 'Modem Phone Number',
            value: '',
            required: false,
            order: second
        }),
        noOfModemAntennas: new TextboxQuestion({
            key: 'noOfModemAntennas',
            label: 'Nos of Modem Antennas',
            value: '',
            required: false,
            order: second
        }),
        UPSBrandNModel: new TextboxQuestion({
            key: 'UPSBrandNModel',
            label: 'UPS Brand & Model',
            value: '',
            required: false,
            order: second
        }),
        UPSBatteryType: new TextboxQuestion({
            key: 'UPSBatteryType',
            label: 'UPS Battery Connection Type',
            value: '',
            required: false,
            order: second
        }),
        UPSBatteryCapacity: new TextboxQuestion({
            key: 'UPSBatteryCapacity',
            label: 'UPS Battery Capacity(Ah)',
            value: '',
            required: false,
            order: second
        }),
        controlSettings: new CategoryLabel({
            key: 'controlSettings',
            label: 'Control Settings',
            value: '',
            required: false,
            order: third
        }),
        sensorLvl4: new TextboxQuestion({
            key: 'sensorLvl4',
            label: 'Sensor Level(metres) at 4 mA',
            value: '',
            required: false,
            order: third
        }),
        sensorLvl20: new TextboxQuestion({
            key: 'sensorLvl20',
            label: 'Sensor Level(metres) at 20 mA',
            value: '',
            required: false,
            order: third
        }),
        sensorLvlOffset: new TextboxQuestion({
            key: 'sensorLvlOffset',
            label: 'Sensor Level(metres) Offset',
            value: '',
            required: false,
            order: third
        }),
        gateDangerLvl: new TextboxQuestion({
            key: 'gateDangerLvl',
            label: 'Gate Danger Level(metres) Setpoint(SP)',
            value: '',
            required: false,
            order: third
        }),
        gateAlertLvl: new TextboxQuestion({
            key: 'gateAlertLvl',
            label: 'Gate Alert Level(metres) Setpoint(SP)',
            value: '',
            required: false,
            order: third
        }),
        gateControlSetpoint: new TextboxQuestion({
            key: 'gateControlSetpoint',
            label: 'Gate Control(metres) Setpoint(SP)',
            value: '',
            required: false,
            order: third
        }),
        SMSSettings: new CategoryLabel({
            key: 'SMSSettings',
            label: 'SMS Settings',
            value: '',
            required: false,
            order: fourth
        }),
        SMSLastSettings: new TextboxQuestion({
            key: 'SMSLastSettings',
            label: 'SMS Last Setting Date(DD/MM/YYYY)',
            value: '',
            type: 'Date',
            required: false,
            order: fourth
        }),
        SMSName1: new TextboxQuestion({
            key: 'SMSName1',
            label: 'SMS Name 1',
            value: '',
            required: false,
            order: fourth
        }),
        no1: new TextboxQuestion({
            key: 'no1',
            label: 'No 1',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName2: new TextboxQuestion({
            key: 'SMSName2',
            label: 'SMS Name 2',
            value: '',
            required: false,
            order: fourth
        }),
        no2: new TextboxQuestion({
            key: 'no2',
            label: 'No 2',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName3: new TextboxQuestion({
            key: 'SMSName3',
            label: 'SMS Name 3',
            value: '',
            required: false,
            order: fourth
        }),
        no3: new TextboxQuestion({
            key: 'no3',
            label: 'No 3',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName4: new TextboxQuestion({
            key: 'SMSName4',
            label: 'SMS Name 4',
            value: '',
            required: false,
            order: fourth
        }),
        no4: new TextboxQuestion({
            key: 'no4',
            label: 'No 4',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName5: new TextboxQuestion({
            key: 'SMSName5',
            label: 'SMS Name 5',
            value: '',
            required: false,
            order: fourth
        }),
        no5: new TextboxQuestion({
            key: 'no5',
            label: 'No 5',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName6: new TextboxQuestion({
            key: 'SMSName6',
            label: 'SMS Name 6',
            value: '',
            required: false,
            order: fourth
        }),
        no6: new TextboxQuestion({
            key: 'no6',
            label: 'No 6',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName7: new TextboxQuestion({
            key: 'SMSName7',
            label: 'SMS Name 7',
            value: '',
            required: false,
            order: fourth
        }),
        no7: new TextboxQuestion({
            key: 'no7',
            label: 'No 7',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName8: new TextboxQuestion({
            key: 'SMSName8',
            label: 'SMS Name 8',
            value: '',
            required: false,
            order: fourth
        }),
        no8: new TextboxQuestion({
            key: 'no8',
            label: 'No 8',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName9: new TextboxQuestion({
            key: 'SMSName9',
            label: 'SMS Name 9',
            value: '',
            required: false,
            order: fourth
        }),
        no9: new TextboxQuestion({
            key: 'no9',
            label: 'No 9',
            value: '',
            required: false,
            order: fourth
        }),
        SMSName10: new TextboxQuestion({
            key: 'SMSName10',
            label: 'SMS Name 10',
            value: '',
            required: false,
            order: fourth
        }),
        no10: new TextboxQuestion({
            key: 'no10',
            label: 'No 10',
            value: '',
            required: false,
            order: fourth
        }),
        operatorName: new TextboxQuestion({
            key: 'operatorName',
            label: 'Operator Name',
            value: '',
            required: false,
            order: fourth
        }),
        operatorPhone: new TextboxQuestion({
            key: 'operatorPhone',
            label: 'Operator Phone Number',
            value: '',
            required: false,
            order: fourth
        }),
        solarPowerSupply: new CategoryLabel({
            key: 'solarPowerSupply',
            label: 'Solar Power Supply(for Solar Supply only)',
            value: '',
            required: false,
            order: fifth
        }),
        actuatorSolarChargeController: new TextboxQuestion({
            key: 'actuatorSolarChargeController',
            label: 'Actuator Solar Charge Controller Model',
            value: '',
            required: false,
            order: fifth
        }),
        actuatorSolarUsage: new TextboxQuestion({
            key: 'actuatorSolarUsage',
            label: 'Actuator Solar Usage Unit',
            value: '',
            required: false,
            order: fifth
        }),
        actuatorSolarNoOfBatteries: new TextboxQuestion({
            key: 'actuatorSolarNoOfBatteries',
            label: 'Actuator Solar Nos of Batteries',
            value: '',
            required: false,
            order: fifth
        }),
        actuatorSolarBatteryCapacity: new TextboxQuestion({
            key: 'actuatorSolarBatteryCapacity',
            label: 'Actuator Solar Battery Capacity(Ah)',
            value: '',
            required: false,
            order: fifth
        }),
        actuatorInverterModel: new TextboxQuestion({
            key: 'actuatorInverterModel',
            label: 'Actuator Inverter Model',
            value: '',
            required: false,
            order: fifth
        }),
        actuatorInverterOutput: new TextboxQuestion({
            key: 'actuatorInverterOutput',
            label: 'Actuator Inverter Output',
            value: '',
            required: false,
            order: fifth
        }),
        SCADASolarChargeController: new TextboxQuestion({
            key: 'SCADASolarChargeController',
            label: 'SCADA Solar Charge Controller Model',
            value: '',
            required: false,
            order: fifth
        }),
        SCADASolarNoOfBatteries: new TextboxQuestion({
            key: 'SCADASolarNoOfBatteries',
            label: 'SCADA Solar Nos of Batteries',
            value: '',
            required: false,
            order: fifth
        }),
        SCADASolarBatteryCapacity: new TextboxQuestion({
            key: 'SCADASolarBatteryCapacity',
            label: 'SCADA Solar Battery Capacity(Ah)',
            value: '',
            required: false,
            order: fifth
        }),
        SCADAInverterModel: new TextboxQuestion({
            key: 'SCADAInverterModel',
            label: 'SCADA Inverter Model',
            value: '',
            required: false,
            order: fifth
        }),
        SCADAInverterOutput: new TextboxQuestion({
            key: 'SCADAInverterOutput',
            label: 'SCADA Inverter Output',
            value: '',
            required: false,
            order: fifth
        }),
        lastUpdateLogLabel: new CategoryLabel({
            key: 'lastUpdateLogLabel',
            label: 'Last Update Log(remarks)',
            value: '',
            required: false,
            order: sixth
        }),
        lastUpdateLog: new FullTextboxQuestion({
            key: 'lastUpdateLog',
            label: '',
            value: '',
            required: false,
            order: sixth
        })
    };

    form.create(batch).then(doc => {}).catch();
});
