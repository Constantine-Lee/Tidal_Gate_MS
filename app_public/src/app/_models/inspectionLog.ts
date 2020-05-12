export class InspectionLog {
    _id: number;
    id: number;
    timestamp: number;
    gate: String;
    date_inspection: String;
    question: string;  

    constructor(options: {
        _id?: number,
        timestamp?: number;
        gate?: String;
        date_inspection?: String;
        question?: string;
    } = {}) {
        this._id = options._id;
        this.timestamp = options.timestamp;
        this.gate = options.gate;
        this.date_inspection = options.date_inspection;
        this.question = options.question;
    }
}