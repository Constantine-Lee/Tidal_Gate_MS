const PDFDocument = require('pdfkit');
var fs = require('fs');
// Create a document
const doc = new PDFDocument;

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

let obj = {
    _id: "5f4f4be08c4a9c4c40b76202",
    profilePhoto: "http://localhost:3000/api/images/uploadImage.png",
    gateInfo: { "controlType": "groupLabel", "key": "gateInfo", "label": "GATE INFORMATION", "value": "xph", "required": false, "order": 0 },
    gateName: { "controlType": "textbox", "key": "gateName", "label": "Gate Name", "value": "afo", "required": true, "order": 0 }, gateID: { "controlType": "textbox", "key": "gateID", "label": "Gate ID", "value": "a2", "required": true, "order": 0 }
}

let questions = [];
const keys = Object.keys(obj);
for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (!['_id', 'profilePhoto', 'timestamp'].includes(key)) {
        questions.push(obj[key]);
        delete obj[key];
    }
}

for(let i = 0; i < questions.length; i++){
    if (questions[i].controlType == "groupLabel") {
        doc.fontSize(12);
        doc.x = 75;
        doc.text(questions[i].label);
    }
    if (questions[i].controlType == "textbox") {
        doc.fontSize(10);
        doc.x = 75;
        doc.text(questions[i].label + ' : ');
        doc.x = 325;
        doc.moveUp();
        doc.text(questions[i].value, { underline: true });
    }
}



// Finalize PDF file
doc.end();