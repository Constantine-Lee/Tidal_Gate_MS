export class Gate {
    _id: string;
    id: number;
    name: string;
    profilePhoto: string;
    timestamp: number;       
    question: string;
    options: { key: string, value: string }[];

    constructor(options: {
        _id?: string,
        name?: string,
        profilePhoto?: string,
        timestamp?: number,
        question?: string,
    } = {}) {
        this._id = options._id;
        this.name = options.name;
        this.profilePhoto = options.profilePhoto;
        this.timestamp = options.timestamp;        
        this.question = options.question;
    }
}