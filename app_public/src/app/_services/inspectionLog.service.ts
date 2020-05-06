import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { InspectionLog } from '../_models/inspectionLog';
import { QuestionBase } from '.././question/questionBase';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'      
    })
  };

@Injectable({ providedIn: 'root' })
export class InspectionLogService {
    constructor(private http: HttpClient) { }

    addInspectionLog(inspectionLog: InspectionLog): Observable<InspectionLog>{
        return this.http.post<InspectionLog>(`${environment.apiUrl}/inspectionLogs`, inspectionLog, httpOptions);
    }

    getInspectionLogs(): Observable<InspectionLog[]>{
       return this.http.get<InspectionLog[]>(`${environment.apiUrl}/inspectionLogs`);
    }

    async getInspectionLogByID(id: string): Promise<InspectionLog>{
      return await this.http.get<InspectionLog>(`${environment.apiUrl}/inspectionLogs/${id}`).toPromise();
   }

    deleteInspectionLog(id : number){
        const url = `${environment.apiUrl}/inspectionLogs/${id}`;
        return this.http.delete<InspectionLog>(url, httpOptions);
    }

    updateInspectionLog(inspectionLog: InspectionLog): Observable<InspectionLog>{
        const url = `${environment.apiUrl}/inspectionLogs/${inspectionLog._id}`;
        return this.http.put<InspectionLog>(url, inspectionLog, httpOptions);
    }


}