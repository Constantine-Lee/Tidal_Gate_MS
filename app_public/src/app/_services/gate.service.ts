import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Gate } from '../_models/gate';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'image/jpeg',
    //'responseType':  'blob'      
  })
};

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class GateService {
  constructor(private http: HttpClient) { }

  addGate(gate: Gate): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/gates`, gate);
  }

  getGates(page: number): Observable<{pager:{}, gates:[]}> {
    return this.http.get<{pager:{}, gates:[]}>(`${environment.apiUrl}/gates?page=${page}`);
  }

  getGateByID(id: string): Observable<Gate> {
    return this.http.get<Gate>(`${environment.apiUrl}/gates/${id}`);
  }

  getProfilePic(url: string) {
    return this.http.get<any>(`${environment.apiUrl}/gates/images/${url}`, httpOptions);
  }

  deleteGate(id: string) {
    const url = `${environment.apiUrl}/gates/${id}`;
    return this.http.delete<Gate>(url);
  }

  updateGate(gate: Gate): Observable<any> {
    const url = `${environment.apiUrl}/gates/${gate._id}`;
    return this.http.put<any>(url, gate);
  }

  upload(base64: any): Observable<string> {
    const url = `${environment.apiUrl}/upload`;
    return this.http.post<string>(url, base64);
  }

  getForms(): Observable<Gate> {
    return this.http.get<Gate>(baseUrl + `/form/gateForm`);
  }
}