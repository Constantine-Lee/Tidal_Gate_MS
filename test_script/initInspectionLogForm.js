const mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;

const zero = 0;
const first = 1;
const second = 2;
const third = 3;
const fourth = 4;
const fifth = 5;
const sixth = 6;
const seventh = 7;
const eighth = 8;

mongoose.connect('mongodb://localhost/fyp', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var baseQuestionSchema = new Schema({
        key: String,
        controlType: String,
        order: Number,
        required: Boolean,
        label: String,
        value: String,
    }, { discriminatorKey: 'controlType', _id: false });

    var textQuestionSchema = new Schema({}, { _id: false });
    textQuestionSchema.add(baseQuestionSchema);

    var dropDownQuestionSchema = new Schema({
        options: []
    }, { _id: false });
    dropDownQuestionSchema.add(baseQuestionSchema);

    var dateQuestionSchema = new Schema({
        value: { type: Date, default: Date.now }
    }, { _id: false });
    dateQuestionSchema.add(baseQuestionSchema);

    var categoryLabelSchema = new Schema({}, { _id: false });
    categoryLabelSchema.add(baseQuestionSchema);

    var inspectionLogSchema = new Schema({
        _id: String,
        id: Number,
        timestamp: { type: Date, default: new Date().toLocaleString },
        namaPenjaga: textQuestionSchema,
        noRujukan: textQuestionSchema,
        lokasiPintuAir: dropDownQuestionSchema,
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

    var docArray = mongoose.model('BaseQuestion', baseQuestionSchema);

    var TextboxQuestion = docArray.discriminator('textbox', new Schema({}, { _id: false }));
    var DropdownQuestion = docArray.discriminator('dropdown', new Schema({
        options: []
    }, { _id: false }));
    var DateQuestion = docArray.discriminator('date', new Schema({
        value: { type: Date, default: Date.now }
    }, { _id: false }));
    var CategoryLabel = docArray.discriminator('groupLabel', new Schema({}, { _id: false }));

    var form = db.model('form', inspectionLogSchema);

    // Create a new batch of events with different kinds
    var batch = {
        _id: 'inspectionLogForm',
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
        huluPintuAir: new DropdownQuestion({
            key: 'huluPintuAir',
            label: 'Hulu Pintu Air',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: first
        }),
        hilirPintuAir: new DropdownQuestion({
            key: 'hilirPintuAir',
            label: 'Hilir Pintu Air',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: first
        }),
        pentasOperasi: new DropdownQuestion({
            key: 'pentasOperasi',
            label: 'Pentas Operasi',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: first
        }),
        railPentasOperasi: new DropdownQuestion({
            key: 'railPentasOperasi',
            label: 'Rail Pentas Operasi',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: first
        }),
        tangga: new DropdownQuestion({
            key: 'tangga',
            label: 'Tangga',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: first
        }),
        tempatDudukPintu: new DropdownQuestion({
            key: 'tempatDudukPintu',
            label: 'Tempat Duduk Pintu',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: first
        }),
        railPintuAir: new DropdownQuestion({
            key: 'railPintuAir',
            label: 'Rail Pintu Air',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
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
        framePintuAir: new DropdownQuestion({
            key: 'framePintuAir',
            label: 'Frame Pintu Air',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: second
        }),
        batuSeimbang: new DropdownQuestion({
            key: 'batuSeimbang',
            label: 'Batu Seimbang',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: second
        }),
        blokBearing: new DropdownQuestion({
            key: 'blokBearing',
            label: 'Blok Bearing / Trunnion',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: second
        }),
        sistemPelincir: new DropdownQuestion({
            key: 'sistemPelincir',
            label: 'Sistem Pelinciran',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: second
        }),
        sealGetah: new DropdownQuestion({
            key: 'sealGetah',
            label: 'Seal Getah (bawah dan tepi)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
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
        tangkiHidrolik: new DropdownQuestion({
            key: 'tangkiHidrolik',
            label: 'Tangki Hidrolik',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        minyak: new DropdownQuestion({
            key: 'minyak',
            label: 'Minyak / Suhu Hidrolik',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        sistemPaip: new DropdownQuestion({
            key: 'sistemPaip',
            label: 'Sistem Paip',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        hos: new DropdownQuestion({
            key: 'hos',
            label: 'Hos',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        enjinDiesel: new DropdownQuestion({
            key: 'enjinDiesel',
            label: 'Enjin Diesel',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        motoHidrolik: new DropdownQuestion({
            key: 'motoHidrolik',
            label: 'Moto Hidrolik',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        pamHidrolik: new DropdownQuestion({
            key: 'pamHidrolik',
            label: 'Pam Hidrolik',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        penyukatT: new DropdownQuestion({
            key: 'penyukatT',
            label: 'Penyukat Tekanan',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        valvePengankut: new DropdownQuestion({
            key: 'valvePengankut',
            label: 'Valve Pemilik Tekanan (Pengankut)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        valveMenurun: new DropdownQuestion({
            key: 'valveMenurun',
            label: 'Valve Pemilik Tekanan (Menurun)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: third
        }),
        penyedutTekanan: new DropdownQuestion({
            key: 'penyedutTekanan',
            label: 'Penyedut Tekanan (Suction Strainer)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
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
        spindle: new DropdownQuestion({
            key: 'spindle',
            label: 'Spindle',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: fourth
        }),
        wire: new DropdownQuestion({
            key: 'wire',
            label: 'Wire',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: fourth
        }),
        clip: new DropdownQuestion({
            key: 'clip',
            label: 'Clip',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: fourth
        }),
        tumbuckle: new DropdownQuestion({
            key: 'tumbuckle',
            label: 'Tumbuckle',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: fourth
        }),
        cat: new DropdownQuestion({
            key: 'cat',
            label: 'Cat',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
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
        kalisAir: new DropdownQuestion({
            key: 'kalisAir',
            label: 'Kalis Air (Waterproof Coating)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: fifth
        }),
        kekuatan: new DropdownQuestion({
            key: 'kekuatan',
            label: 'Kekuatan (Strength)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: fifth
        }),
        karat: new DropdownQuestion({
            key: 'karat',
            label: 'Karat (Rust)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: fifth
        }),
        catPaint: new DropdownQuestion({
            key: 'catPaint',
            label: 'Cat (Paint)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
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
        pelinciranL: new DropdownQuestion({
            key: 'pelinciranL',
            label: 'Pelinciran (Lubrication)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: sixth
        }),
        haus: new DropdownQuestion({
            key: 'haus',
            label: 'Haus (Wear)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: sixth
        }),
        kP: new DropdownQuestion({
            key: 'kP',
            label: 'Kemudahan Pengangkutan (Ease of Travel)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: sixth
        }),
        pDPGG: new DropdownQuestion({
            key: 'pDPGG',
            label: 'Pembukaan dan Penutupan Gear-Gear',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: sixth
        }),
        wireAngkut: new DropdownQuestion({
            key: 'wireAngkut',
            label: 'Wire Angkut (Lifting Rope)',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
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
        accessRoad: new DropdownQuestion({
            key: 'accessRoad',
            label: 'Access Road',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: seventh
        }),
        stickGauge: new DropdownQuestion({
            key: 'stickGauge',
            label: 'Stick Gauge Condition',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
            order: seventh
        }),
        others: new TextboxQuestion({
            key: 'others',
            label: 'Others',
            value: '',
            required: false,
            order: seventh
        }),
        aITS: new DropdownQuestion({
            key: 'aITS',
            label: 'Adakah Inspeksi TCG Selesai?',
            options: [{ key: 'Ya', value: 'Ya' }, { key: 'Tidak', value: 'Tidak' }],
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
            required: false,
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
    };

    form.create(batch).then(doc => { }).catch();
});
