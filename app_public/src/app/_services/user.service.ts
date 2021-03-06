import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    deleteUser(id: number) {
        const url = `${environment.apiUrl}/users/${id}`;
        return this.http.delete<User>(url);
      }

    addOperator(operator: User){
        const url = `${environment.apiUrl}/register`;
        return this.http.post<User>(url, operator);
    }
}