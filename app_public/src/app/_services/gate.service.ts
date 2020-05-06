import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Gate } from '../_models/gate';
import { QuestionBase } from '.././question/questionBase';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'image/jpeg',
    //'responseType':  'blob'      
  })
};

@Injectable({ providedIn: 'root' })
export class GateService {
  constructor(private http: HttpClient) { }

  addGate(gate: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/gates`, gate);
  }

  getGates(): Observable<Gate[]> {
    return this.http.get<Gate[]>(`${environment.apiUrl}/gates`);
  }

  async getGateByID(id: string): Promise<Gate> {
    return await this.http.get<Gate>(`${environment.apiUrl}/gates/${id}`).toPromise();
  }

  getProfilePic(url: string) {
    return this.http.get<any>(`${environment.apiUrl}/gates/images/${url}`, httpOptions);
  }

  deleteGate(id: number) {
    const url = `${environment.apiUrl}/gates/${id}`;
    return this.http.delete<Gate>(url);
  }

  updateGate(gate: FormData): Observable<any>{
    const url = `${environment.apiUrl}/gates/${gate['_id']}`;
    return this.http.put<any>(url, gate);
}
}