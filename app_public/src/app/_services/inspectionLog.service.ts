import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { InspectionLog } from '../_models/inspectionLog';
import { LoggingService } from './logging.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class InspectionLogService {

  constructor(
    private http: HttpClient,
    private logger: LoggingService) { }

  addInspectionLog(inspectionLog: InspectionLog): Observable<InspectionLog> {
    return this.http.post<InspectionLog>(baseUrl + `/inspectionLogs`, inspectionLog, httpOptions);
  }

  getInspectionLogs(page: number, searchText: string, sortImportance: string[], iDSort: number, dateSort: number): Observable<{ pager: {}, inspectionLogs: [] }> {
    return this.http.get<{ pager: {}, inspectionLogs: [] }>(baseUrl + `/inspectionLogs?page=${page}&searchText=${searchText}&sortImportance=${sortImportance}&iDSort=${iDSort}&dateSort=${dateSort}`);
  }

  getInspectionLogByID(id: string): Observable<InspectionLog> {
    return this.http.get<InspectionLog>(baseUrl + `/inspectionLogs/${id}`);
  }

  deleteInspectionLog(id: number) {
    return this.http.delete<InspectionLog>(baseUrl + `/inspectionLogs/${id}`, httpOptions);
  }

  updateInspectionLog(inspectionLog: InspectionLog): Observable<InspectionLog> {
    return this.http.put<InspectionLog>(baseUrl + `/inspectionLogs/${inspectionLog._id}`, inspectionLog, httpOptions);
  }

  getForms(): Observable<InspectionLog> {
    return this.http.get<InspectionLog>(baseUrl + `/form/inspectionLogForm`);
  }

  downloadPDF(id: string): Observable<any> {
    return this.http.get(baseUrl + `/inspectionLogs/download/${id}`, { responseType: 'blob'});
  }
}