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
    },
        { discriminatorKey: 'controlType', _id: false });

    var batchSchema = new Schema({ questions: [baseQuestionSchema] });

    var docArray = batchSchema.path('questions');

    var textQuestionSchema = new Schema({}, { _id: false });
    var dropDownQuestionSchema = new Schema({
        options: []
    }, { _id: false });
    var dateQuestionSchema = new Schema({
        value: {type: Date, default: Date.now}
    }, { _id: false });
    var categoryLabelSchema = new Schema({}, { _id: false});


    var TextboxQuestion = docArray.discriminator('textbox', textQuestionSchema);
    var DropdownQuestion = docArray.discriminator('dropdown', dropDownQuestionSchema);
    var DateQuestion = docArray.discriminator('date', dateQuestionSchema);
    var CategoryLabel = docArray.discriminator('groupLabel', categoryLabelSchema);

    var Batch = db.model('EventBatch', batchSchema);

    // Create a new batch of events with different kinds
    var batch = {
        questions: [
            new TextboxQuestion({
                key: 'Nama Penjaga',
                label: 'Nama Penjaga',                
                required: true,
                order: zero
            }),
            new TextboxQuestion({
                key: 'No. Rujukan',
                label: 'No. Rujukan',                
                required: true,
                order: zero
            }),
            new DropdownQuestion({
                key: 'Lokasi_Pintu_Air',
                label: 'Lokasi Pintu Air',
                options:  this.gateSelection,
                order: zero,
                required: true
            }),
            new TextboxQuestion({
                key: 'Jenis Gearbox',
                label: 'Jenis Gearbox',
                value: 'AKPA-2A',
                required: false,
                order: zero
            }),
            new DateQuestion({
                key: 'Tarikh',
                label: 'Tarikh',                          
                required: true,
                order: zero
            }),
            new CategoryLabel({
                key: '1. Struktur Pintu',
                label: '1. Struktur Pintu',                
                required: false,
                order: first
            }),
            new DropdownQuestion({
                key: 'Hulu Pintu Air',
                label: 'Hulu Pintu Air',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],                
                order: first
            }),
            new DropdownQuestion({
                key: 'Hilir Pintu Air',
                label: 'Hilir Pintu Air',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: first
            }),
            new DropdownQuestion({
                key: 'Pentas Operasi',
                label: 'Pentas Operasi',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: first
            }),
            new DropdownQuestion({
                key: 'Rail Pentas Operasi',
                label: 'Rail Pentas Operasi',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: first
            }),
            new DropdownQuestion({
                key: 'Tangga',
                label: 'Tangga',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: first
            }),
            new DropdownQuestion({
                key: 'Tempat Duduk Pintu',
                label: 'Tempat Duduk Pintu',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: first
            }),
            new DropdownQuestion({
                key: 'Rail Pintu Air',
                label: 'Rail Pintu Air',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: first
            }),
            new TextboxQuestion({
                key: 'Cadangan (Struktur Pintu)',
                label: 'Cadangan (Struktur Pintu)',
                value: '',
                required: false,
                order: first
            }),
            new CategoryLabel({
                key: '2. Badan Pintu Air',
                label: '2. Badan Pintu Air',                
                required: false,
                order: second
            }),
            new DropdownQuestion({
                key: 'Frame Pintu Air',
                label: 'Frame Pintu Air',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: second
            }),
            new DropdownQuestion({
                key: 'Batu Seimbang',
                label: 'Batu Seimbang',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: second
            }),
            new DropdownQuestion({
                key: 'Blok Bearing / Trunnion',
                label: 'Blok Bearing / Trunnion',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: second
            }),
            new DropdownQuestion({
                key: 'Sistem Pelinciran',
                label: 'Sistem Pelinciran',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: second
            }),
            new DropdownQuestion({
                key: 'Seal Getah (bawah dan tepi)',
                label: 'Seal Getah (bawah dan tepi)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: second
            }),
            new TextboxQuestion({
                key: 'Cadangan (Badan Pintu Air)',
                label: 'Cadangan (Badan Pintu Air)',
                value: '',
                required: false,
                order: second
            }),
            new CategoryLabel({
                key: '3. Mekanisma Pengangkut',
                label: '3. Mekanisma Pengangkut',                
                required: false,
                order: third
            }),            
            new DropdownQuestion({
                key: 'Tangki Hidrolik',
                label: 'Tangki Hidrolik',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Minyak / Suhu Hidrolik',
                label: 'Minyak / Suhu Hidrolik',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Sistem Paip',
                label: 'Sistem Paip',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Hos',
                label: 'Hos',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Enjin Diesel',
                label: 'Enjin Diesel',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Moto Hidrolik',
                label: 'Moto Hidrolik',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Pam Hidrolik',
                label: 'Pam Hidrolik',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Penyukat Tekanan',
                label: 'Penyukat Tekanan',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Valve Pemilik Tekanan (Pengankut)',
                label: 'Valve Pemilik Tekanan (Pengankut)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Valve Pemilik Tekanan (Menurun)',
                label: 'Valve Pemilik Tekanan (Menurun)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new DropdownQuestion({
                key: 'Penyedut Tekanan (Suction Strainer)',
                label: 'Penyedut Tekanan (Suction Strainer)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: third
            }),
            new TextboxQuestion({
                key: 'Cadangan (Mekanisma Pengangkut)',
                label: 'Cadangan (Mekanisma Pengangkut)',
                value: '',
                required: false,
                order: third
            }),
            new CategoryLabel({
                key: '4. Umum',
                label: '4. Umum',                
                required: false,
                order: fourth
            }),
            new DropdownQuestion({
                key: 'Spindle',
                label: 'Spindle',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fourth
            }),
            new DropdownQuestion({
                key: 'Wire',
                label: 'Wire',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fourth
            }),
            new DropdownQuestion({
                key: 'Clip',
                label: 'Clip',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fourth
            }),
            new DropdownQuestion({
                key: 'Tumbuckle',
                label: 'Tumbuckle',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fourth
            }),
            new DropdownQuestion({
                key: 'Cat',
                label: 'Cat',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fourth
            }),
            new TextboxQuestion({
                key: 'Cadangan (Umum)',
                label: 'Cadangan (Umum)',                
                required: false,
                order: fourth
            }),
            new CategoryLabel({
                key: '5. Rail Pintu dan Lekatnya',
                label: '5. Rail Pintu dan Lekatnya',               
                required: false,
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Kalis Air (Waterproof Coating)',
                label: 'Kalis Air (Waterproof Coating)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Kekuatan (Strength)',
                label: 'Kekuatan (Strength)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Karat (Rust)',
                label: 'Karat (Rust)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fifth
            }),
            new DropdownQuestion({
                key: 'Cat (Paint)',
                label: 'Cat (Paint)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: fifth
            }),
            new TextboxQuestion({
                key: 'Cadangan (Rail Pintu dan Lekatnya)',
                label: 'Cadangan (Rail Pintu dan Lekatnya)',                
                required: false,
                order: fifth
            }),
            new CategoryLabel({
                key: '6. Fungsi Air Pintu',
                label: '6. Fungsi Air Pintu',                
                required: false,
                order: sixth
            }),  
            new DropdownQuestion({
                key: 'Pelinciran (Lubrication)',
                label: 'Pelinciran (Lubrication)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: sixth
            }),
            new DropdownQuestion({
                key: 'Haus (Wear)',
                label: 'Haus (Wear)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: sixth
            }),
            new DropdownQuestion({
                key: 'Kemudahan Pengangkutan (Ease of Travel)',
                label: 'Kemudahan Pengangkutan (Ease of Travel)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: sixth
            }),
            new DropdownQuestion({
                key: 'Pembukaan dan Penutupan Gear-Gear',
                label: 'Pembukaan dan Penutupan Gear-Gear',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: sixth
            }),
            new DropdownQuestion({
                key: 'Wire Angkut (Lifting Rope)',
                label: 'Wire Angkut (Lifting Rope)',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: sixth
            }),
            new TextboxQuestion({
                key: 'Cadangan (Rail Pintu dan Lekatnya)',
                label: 'Cadangan (Rail Pintu dan Lekatnya)',
                value: '',
                required: false,
                order: sixth
            }),
            new CategoryLabel({
                key: '7. Miscellaneous ',
                label: '7. Miscellaneous ',                
                required: false,
                order: seventh
            }),   
            new DropdownQuestion({
                key: 'Access Road',
                label: 'Access Road',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: seventh
            }),
            new DropdownQuestion({
                key: 'Stick Gauge Condition',
                label: 'Stick Gauge Condition',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: seventh
            }),
            new TextboxQuestion({
                key: 'Others',
                label: 'Others',
                value: '',
                required: false,
                order: seventh
            }),
            new DropdownQuestion({
                key: 'Adakah Inspeksi TCG Selesai?',
                label: 'Adakah Inspeksi TCG Selesai?',
                options: [
                    { key: 'Ya', value: 'Ya' },
                    { key: 'Tidak', value: 'Tidak' }
                ],
                order: seventh
            }),
            new CategoryLabel({
                key: 'TCG SCADA and Automation System Inspection Report',
                label: 'TCG SCADA and Automation System Inspection Report',                
                required: false,
                order: eighth
            }),   
            new TextboxQuestion({
                key: 'Tested By',
                label: 'Tested By',
                value: '',
                required: true,
                order: eighth
            }),
            new TextboxQuestion({
                key: 'Witnessed By',
                label: 'Witnessed By',
                value: '',
                required: false,
                order: eighth
            }),
            new TextboxQuestion({
                key: 'Reviewed By',
                label: 'Reviewed By',
                value: '',
                required: false,
                order: eighth
            }),
            new TextboxQuestion({
                key: 'Approved By',
                label: 'Approved By',
                value: '',
                required: false,
                order: eighth
            })
        ]
    };

    Batch.create(batch).
        then(function (doc) {
            //doc.events.push({ kind: 'Purchased', product: 'action-figure-2' });
            //return doc.save();
        }).
        then(function (doc) {
        }).
        catch();
});
