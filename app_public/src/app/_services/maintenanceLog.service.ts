import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { QuestionBase } from '.././question/questionBase';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'      
    })
  };

var RmaintenanceLog: any;

@Injectable({ providedIn: 'root' })
export class MaintenanceLogService {
    constructor(private http: HttpClient) { }

    addMaintenanceLog(questions: any): Observable<any>{
        return this.http.post<any>(`${environment.apiUrl}/maintenancelog/maintenancelog`, questions, httpOptions).pipe(
            tap((answer: any) => console.log(answer))
        );
    }

    getMaintenanceLogs(): Observable<any>{
       return this.http.get<any>(`${environment.apiUrl}/maintenancelog/maintenancelogs`);
    }

    deleteMaintenanceLog(id : number){
        const url = `${environment.apiUrl}/maintenancelog/delete?logId=${id}`;
        console.log(url);
        return this.http.delete<any>(url, httpOptions).pipe(
          tap(_ => console.log(`deleted hero id=${id}`))
        );
    }

    updateMaintenanceLog(maintenanceLog: MaintenanceLog): Observable<any>{
        const url = `${environment.apiUrl}/maintenancelog/edit?logId=${maintenanceLog._id}`;
        console.log(url);
        console.log(maintenanceLog);
        return this.http.put(url, maintenanceLog, httpOptions).pipe(
            tap((answer: any) => console.log(answer))
          );
    }
}