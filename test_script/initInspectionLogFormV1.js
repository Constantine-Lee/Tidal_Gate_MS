const mongoose = require('mongoose');

const { zero,
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
    eighth} = require('../app_api/models/CONSTANT');

const {
    baseQuestionSchema } = require('../app_api/models/form');

const {
    inspectionLogSchema, v1Schema } = require('../app_api/models/gateAndLogs');

mongoose.connect('mongodb://localhost/fyp', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    var docArray = mongoose.model('BaseQuestion', baseQuestionSchema);
    var TextboxQuestion = docArray.discriminator('textbox', new mongoose.Schema({}, { _id: false }));
    var DropdownQuestion = docArray.discriminator('dropdown', new mongoose.Schema({
        options: []
    }, { _id: false }));
    var DateQuestion = docArray.discriminator('date', new mongoose.Schema({
        value: { type: Date }
    }, { _id: false }));
    var CategoryLabel = docArray.discriminator('groupLabel', new mongoose.Schema({}, { _id: false }));
    const Form = mongoose.model('form', inspectionLogSchema);
    const v1 = Form.discriminator('v1', v1Schema);

    // Create a new batch of events with different kinds
    var batch = new v1({
        schemaOf: 'inspectionLogForm',
        namaPenjaga: new TextboxQuestion({
            key: 'namaPenjaga',
            label: 'Nama Penjaga',
            required: true,
            order: zero
        }),
        noRujukan: new TextboxQuestion({
            key: 'noRujukan',
            label: 'No. Rujukan',
            required: true,
            order: zero
        }),
        lokasiPintuAir: new DropdownQuestion({
            key: 'lokasiPintuAir',
            label: 'Lokasi Pintu Air',
            order: zero,
            required: true
        }),
        jenisGearbox: new TextboxQuestion({
            key: 'jenisGearbox',
            label: 'Jenis Gearbox',
            value: 'AKPA-2A',
            required: false,
            order: zero
        }),
        tarikh: new DateQuestion({
            key: 'tarikh',
            label: 'Tarikh',
            required: true,
            order: zero
        }),
        strukturPintu: new CategoryLabel({
            key: 'strukturPintu',
            label: '1. Struktur Pintu',
            required: false,
            order: first
        }),
        huluPintuAir: new TextboxQuestion({
            key: 'huluPintuAir',
            label: 'Hulu Pintu Air',
            value: '',
            required: false,
            order: first
        }),
        hilirPintuAir: new TextboxQuestion({
            key: 'hilirPintuAir',
            label: 'Hilir Pintu Air',
            value: '',
            required: false,
            order: first
        }),
        pentasOperasi: new TextboxQuestion({
            key: 'pentasOperasi',
            label: 'Pentas Operasi',
            value: '',
            required: false,
            order: first
        }),
        railPentasOperasi: new TextboxQuestion({
            key: 'railPentasOperasi',
            label: 'Rail Pentas Operasi',
            value: '',
            required: false,
            order: first
        }),
        tangga: new TextboxQuestion({
            key: 'tangga',
            label: 'Tangga',
            value: '',
            required: false,
            order: first
        }),
        tempatDudukPintu: new TextboxQuestion({
            key: 'tempatDudukPintu',
            label: 'Tempat Duduk Pintu',
            value: '',
            required: false,
            order: first
        }),
        railPintuAir: new TextboxQuestion({
            key: 'railPintuAir',
            label: 'Rail Pintu Air',
            value: '',
            required: false,
            order: first
        }),
        cadanganSP: new TextboxQuestion({
            key: 'cadanganSP',
            label: 'Cadangan (Struktur Pintu)',
            value: '',
            required: false,
            order: first
        }),
        badanPintuAir: new CategoryLabel({
            key: 'badanPintuAir',
            label: '2. Badan Pintu Air',
            required: false,
            order: second
        }),
        framePintuAir: new TextboxQuestion({
            key: 'framePintuAir',
            label: 'Frame Pintu Air',
            value: '',
            required: false,
            order: second
        }),
        batuSeimbang: new TextboxQuestion({
            key: 'batuSeimbang',
            label: 'Batu Seimbang',
            value: '',
            required: false,
            order: second
        }),
        blokBearing: new TextboxQuestion({
            key: 'blokBearing',
            label: 'Blok Bearing / Trunnion',
            value: '',
            required: false,
            order: second
        }),
        sistemPelincir: new TextboxQuestion({
            key: 'sistemPelincir',
            label: 'Sistem Pelinciran',
            value: '',
            required: false,
            order: second
        }),
        sealGetah: new TextboxQuestion({
            key: 'sealGetah',
            label: 'Seal Getah (bawah dan tepi)',
            value: '',
            required: false,
            order: second
        }),
        cadanganBPA: new TextboxQuestion({
            key: 'cadanganBPA',
            label: 'Cadangan (Badan Pintu Air)',
            value: '',
            required: false,
            order: second
        }),
        mekanismaP: new CategoryLabel({
            key: 'mekanismaP',
            label: '3. Mekanisma Pengangkut',
            required: false,
            order: third
        }),
        tangkiHidrolik: new TextboxQuestion({
            key: 'tangkiHidrolik',
            label: 'Tangki Hidrolik',
            value: '',
            required: false,
            order: third
        }),
        minyak: new TextboxQuestion({
            key: 'minyak',
            label: 'Minyak / Suhu Hidrolik',
            value: '',
            required: false,
            order: third
        }),
        sistemPaip: new TextboxQuestion({
            key: 'sistemPaip',
            label: 'Sistem Paip',
            value: '',
            required: false,
            order: third
        }),
        hos: new TextboxQuestion({
            key: 'hos',
            label: 'Hos',
            value: '',
            required: false,
            order: third
        }),
        enjinDiesel: new TextboxQuestion({
            key: 'enjinDiesel',
            label: 'Enjin Diesel',
            value: '',
            required: false,
            order: third
        }),
        motoHidrolik: new TextboxQuestion({
            key: 'motoHidrolik',
            label: 'Moto Hidrolik',
            value: '',
            required: false,
            order: third
        }),
        pamHidrolik: new TextboxQuestion({
            key: 'pamHidrolik',
            label: 'Pam Hidrolik',
            value: '',
            required: false,
            order: third
        }),
        penyukatT: new TextboxQuestion({
            key: 'penyukatT',
            label: 'Penyukat Tekanan',
            value: '',
            required: false,
            order: third
        }),
        valvePengankut: new TextboxQuestion({
            key: 'valvePengankut',
            label: 'Valve Pemilik Tekanan (Pengankut)',
            value: '',
            required: false,
            order: third
        }),
        valveMenurun: new TextboxQuestion({
            key: 'valveMenurun',
            label: 'Valve Pemilik Tekanan (Menurun)',
            value: '',
            required: false,
            order: third
        }),
        penyedutTekanan: new TextboxQuestion({
            key: 'penyedutTekanan',
            label: 'Penyedut Tekanan (Suction Strainer)',
            value: '',
            required: false,
            order: third
        }),
        cadanganMknmPgkt: new TextboxQuestion({
            key: 'cadanganMknmPgkt',
            label: 'Cadangan (Mekanisma Pengangkut)',
            value: '',
            required: false,
            order: third
        }),
        umum: new CategoryLabel({
            key: 'umum',
            label: '4. Umum',
            required: false,
            order: fourth
        }),
        spindle: new TextboxQuestion({
            key: 'spindle',
            label: 'Spindle',
            value: '',
            required: false,
            order: fourth
        }),
        wire: new TextboxQuestion({
            key: 'wire',
            label: 'Wire',
            value: '',
            required: false,
            order: fourth
        }),
        clip: new TextboxQuestion({
            key: 'clip',
            label: 'Clip',
            value: '',
            required: false,
            order: fourth
        }),
        tumbuckle: new TextboxQuestion({
            key: 'tumbuckle',
            label: 'Tumbuckle',
            value: '',
            required: false,
            order: fourth
        }),
        cat: new TextboxQuestion({
            key: 'cat',
            label: 'Cat',
            value: '',
            required: false,
            order: fourth
        }),
        cadanganUmum: new TextboxQuestion({
            key: 'cadanganUmum',
            label: 'Cadangan (Umum)',
            required: false,
            order: fourth
        }),
        railPL: new CategoryLabel({
            key: 'railPL',
            label: '5. Rail Pintu dan Lekatnya',
            required: false,
            order: fifth
        }),
        kalisAir: new TextboxQuestion({
            key: 'kalisAir',
            label: 'Kalis Air (Waterproof Coating)',
            value: '',
            required: false,
            order: fifth
        }),
        kekuatan: new TextboxQuestion({
            key: 'kekuatan',
            label: 'Kekuatan (Strength)',
            value: '',
            required: false,
            order: fifth
        }),
        karat: new TextboxQuestion({
            key: 'karat',
            label: 'Karat (Rust)',
            value: '',
            required: false,
            order: fifth
        }),
        catPaint: new TextboxQuestion({
            key: 'catPaint',
            label: 'Cat (Paint)',
            value: '',
            required: false,
            order: fifth
        }),
        cadanganRPLLabel: new TextboxQuestion({
            key: 'cadanganRPLLabel',
            label: 'Cadangan (Rail Pintu dan Lekatnya)',
            required: false,
            order: fifth
        }),
        fungsiAirPintu: new CategoryLabel({
            key: 'fungsiAirPintu',
            label: '6. Fungsi Air Pintu',
            required: false,
            order: sixth
        }),
        pelinciranL: new TextboxQuestion({
            key: 'pelinciranL',
            label: 'Pelinciran (Lubrication)',
            value: '',
            required: false,
            order: sixth
        }),
        haus: new TextboxQuestion({
            key: 'haus',
            label: 'Haus (Wear)',
            value: '',
            required: false,
            order: sixth
        }),
        kP: new TextboxQuestion({
            key: 'kP',
            label: 'Kemudahan Pengangkutan (Ease of Travel)',
            value: '',
            required: false,
            order: sixth
        }),
        pDPGG: new TextboxQuestion({
            key: 'pDPGG',
            label: 'Pembukaan dan Penutupan Gear-Gear',
            value: '',
            required: false,
            order: sixth
        }),
        wireAngkut: new TextboxQuestion({
            key: 'wireAngkut',
            label: 'Wire Angkut (Lifting Rope)',
            value: '',
            required: false,
            order: sixth
        }),
        cadanganRPLText: new TextboxQuestion({
            key: 'cadanganRPLText',
            label: 'Cadangan (Rail Pintu dan Lekatnya)',
            value: '',
            required: false,
            order: sixth
        }),
        miscellaneous: new CategoryLabel({
            key: 'miscellaneous',
            label: '7. Miscellaneous',
            required: false,
            order: seventh
        }),
        accessRoad: new TextboxQuestion({
            key: 'accessRoad',
            label: 'Access Road',
            value: '',
            required: false,
            order: seventh
        }),
        stickGauge: new TextboxQuestion({
            key: 'stickGauge',
            label: 'Stick Gauge Condition',
            value: '',
            required: false,
            order: seventh
        }),
        others: new TextboxQuestion({
            key: 'others',
            label: 'Others',
            value: '',
            required: false,
            order: seventh
        }),
        aITS: new TextboxQuestion({
            key: 'aITS',
            label: 'Adakah Inspeksi TCG Selesai?',
            value: '',
            required: false,
            order: seventh
        }),
        TSASIR: new CategoryLabel({
            key: 'TSASIR',
            label: 'TCG SCADA and Automation System Inspection Report',
            required: false,
            order: eighth
        }),
        testedBy: new TextboxQuestion({
            key: 'testedBy',
            label: 'Tested By',
            value: '',
            required: true,
            order: eighth
        }),
        witnessedBy: new TextboxQuestion({
            key: 'witnessedBy',
            label: 'Witnessed By',
            value: '',
            required: true,
            order: eighth
        }),
        reviewedBy: new TextboxQuestion({
            key: 'reviewedBy',
            label: 'Reviewed By',
            value: '',
            required: false,
            order: eighth
        }),
        approvedBy: new TextboxQuestion({
            key: 'approvedBy',
            label: 'Approved By',
            value: '',
            required: false,
            order: eighth
        })
    });

    v1.create(batch).then(doc => { }).catch();
});
