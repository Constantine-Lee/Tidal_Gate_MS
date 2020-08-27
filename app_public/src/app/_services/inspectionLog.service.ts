import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { InspectionLog } from '../_models/inspectionLog';
import { QuestionBase } from '../question/questionType';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class InspectionLogService {


  constructor(private http: HttpClient) { }

  addInspectionLog(inspectionLog: InspectionLog): Observable<InspectionLog> {
    return this.http.post<InspectionLog>(baseUrl + `/inspectionLogs`, inspectionLog, httpOptions);
  }

  getInspectionLogs(): Observable<InspectionLog[]> {
    return this.http.get<InspectionLog[]>(baseUrl + `/inspectionLogs`);
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

  getForm(): Promise<QuestionBase<string>[]> {
    return this.http.get<QuestionBase<string>[]>(baseUrl + `/form/inspectionLog`).toPromise();
  }

  getForms() {
    return this.http.get<QuestionBase<string>[]>(baseUrl + `/form/inspectionLogForm`);
  }

}