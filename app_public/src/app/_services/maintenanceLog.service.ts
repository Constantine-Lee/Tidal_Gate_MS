import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MaintenanceLog } from '../_models/maintenanceLog';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class MaintenanceLogService {

  constructor(private http: HttpClient) { }
  
  addMaintenanceLog(maintenanceLog: MaintenanceLog): Observable<MaintenanceLog> {
    return this.http.post<MaintenanceLog>(baseUrl + `/maintenanceLogs`, maintenanceLog, httpOptions);
  }

  getMaintenanceLogs(page: number, searchText: string, sortImportance: string[], iDSort: number, dateSort: number): Observable<{ pager: {}, maintenanceLogs: [] }> {
    return this.http.get<{ pager: {}, maintenanceLogs: [] }>(baseUrl + `/maintenanceLogs?page=${page}&searchText=${searchText}&sortImportance=${sortImportance}&iDSort=${iDSort}&dateSort=${dateSort}`);
  }

  getMaintenanceLogByID(id: string): Observable<MaintenanceLog> {
    return this.http.get<MaintenanceLog>(baseUrl + `/maintenanceLogs/${id}`);
  }

  deleteMaintenanceLog(id: string) {
    return this.http.delete<MaintenanceLog>(baseUrl + `/maintenanceLogs/${id}`);
  }

  updateMaintenanceLog(maintenanceLog: MaintenanceLog): Observable<MaintenanceLog> {
    return this.http.put<MaintenanceLog>(baseUrl + `/maintenanceLogs/${maintenanceLog._id}`, maintenanceLog, httpOptions);
  }

  getForms(): Observable<MaintenanceLog> {
    return this.http.get<MaintenanceLog>(baseUrl + `/form/maintenanceLogForm`);
  }

  downloadPDF(id: string): Observable<any> {
    return this.http.get(baseUrl + `/maintenanceLogs/download/${id}`, { responseType: 'blob'});
  }

  upload(base64: string, _id: string): Observable<string> {
    const url = `${environment.apiUrl}/upload`;
    console.log(_id);
    return this.http.post<string>(url, { 'base64String': base64, 'id': _id });
  }  
}