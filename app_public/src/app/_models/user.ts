import { Role } from "./role";

export class User {
    _id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;    
    role: Role;
    token?: string;

    constructor(options: {
        _id?: number,
        username?: string,
        password?: string,
        role?: Role,
        token?: string
    } = {}) {
        this._id = options._id;
        this.username = options.username;
        this.password = options.password;
        this.role = options.role;
        this.token = options.token;
    }
}