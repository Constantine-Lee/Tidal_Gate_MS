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
      'responseType':  'blob'      
    })
  };

@Injectable({ providedIn: 'root' })
export class GateService {
    constructor(private http: HttpClient) { }

    addGate(questions: any): Observable<any>{
        return this.http.post<any>(`${environment.apiUrl}/gate`, questions).pipe(
            tap((answer: any) => console.log(answer))
        );
    }

    getGates(): Observable<any>{
       return this.http.get<any>(`${environment.apiUrl}/gate`);
    }

    getProfilePic(){
      return this.http.get<any>(`${environment.apiUrl}/gate/image/gate-1587126279204.jpg`, httpOptions).pipe(
        tap((answer: any) => console.log(answer))
    );
    }

    deleteGate(id : number){
      const url = `${environment.apiUrl}/gate/${id}`;      
      return this.http.delete<any>(url).pipe(
        tap(_ => console.log(`deleted gate id=${id}`))
      );
  }
}