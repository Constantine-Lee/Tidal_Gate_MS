export class MaintenanceLog {
    _id: number;
    id: number;
    timestamp: number;
    gate: String;
    date_maintenance: String;
    action_taken: String;
    action_needed: String;
    question: string;
    options: { key: string, value: string }[];

    constructor(options: {
        _id?: number,
        timestamp?: number;
        gate?: String;
        date_maintenance?: String;
        action_taken?: String;
        action_needed?: String;
        question?: string;
    } = {}) {
        this._id = options._id;
        this.timestamp = options.timestamp;
        this.gate = options.gate;
        this.date_maintenance = options.date_maintenance;
        this.action_taken = options.action_taken;
        this.action_needed = options.action_needed;
        this.question = options.question;
    }
}