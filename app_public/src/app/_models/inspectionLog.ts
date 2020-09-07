import { QuestionBase } from './questionType';

export class InspectionLog {
    _id: number;
    id: number;
    timestamp: number;
    questions: QuestionBase[];

    constructor(options: {
        _id?: number,
        timestamp?: number;
        questions?: QuestionBase[];
    } = {}) {
        this._id = options._id;
        this.timestamp = options.timestamp;        
        this.questions = options.questions;
    }
}