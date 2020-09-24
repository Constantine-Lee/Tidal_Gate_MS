import { QuestionBase } from './questionType';

export class MaintenanceLog {
    _id: string;
    id: string;
    timestamp: number;    
    questions: QuestionBase[];    

    constructor(options: {
        _id?: string,
        timestamp?: number;        
        questions?: QuestionBase[];
    } = {}) {
        this._id = options._id;
        this.timestamp = options.timestamp;        
        this.questions = options.questions;
    }
}