import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

    addInspectionLog(questions: any): Observable<any>{
        return this.http.post<any>(`${environment.apiUrl}/inspectionlog`, questions, httpOptions).pipe(
            tap((answer: any) => console.log(answer))
        );
    }

    getInspectionLogs(): Observable<any>{
       return this.http.get<any>(`${environment.apiUrl}/inspectionlog`);
    }

    deleteInspectionLog(id : number){
        const url = `${environment.apiUrl}/inspectionlog/${id}`;
        console.log(url);
        return this.http.delete<any>(url, httpOptions).pipe(
          tap(_ => console.log(`deleted inspection log id=${id}`))
        );
    }

    updateInspectionLog(inspectionLog: InspectionLog): Observable<any>{
        const url = `${environment.apiUrl}/inspectionlog/${inspectionLog._id}`;
        return this.http.put(url, inspectionLog, httpOptions).pipe(
            tap((answer: any) => console.log(answer))
          );
    }
}