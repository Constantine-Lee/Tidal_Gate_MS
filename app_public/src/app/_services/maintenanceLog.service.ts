import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { InspectionLog } from '../_models/inspectionLog';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'      
    })
  };

@Injectable({ providedIn: 'root' })
export class MaintenanceLogService {
    constructor(private http: HttpClient) { }

    addMaintenanceLog(questions: MaintenanceLog): Observable<MaintenanceLog>{
        return this.http.post<MaintenanceLog>(`${environment.apiUrl}/maintenanceLogs`, questions, httpOptions);
    }

    getMaintenanceLogs(): Observable<MaintenanceLog[]>{
       return this.http.get<MaintenanceLog[]>(`${environment.apiUrl}/maintenanceLogs`);
    }

    async getMaintenanceLogByID(id: string): Promise<MaintenanceLog>{
      return await this.http.get<MaintenanceLog>(`${environment.apiUrl}/maintenanceLogs/${id}`).toPromise();
   }

    deleteMaintenanceLog(id : number){
        const url = `${environment.apiUrl}/maintenanceLogs/${id}`;        
        return this.http.delete<MaintenanceLog>(url, httpOptions);
    }

    updateMaintenanceLog(maintenanceLog: MaintenanceLog): Observable<MaintenanceLog>{
        const url = `${environment.apiUrl}/maintenanceLogs/${maintenanceLog._id}`;
        return this.http.put<MaintenanceLog>(url, maintenanceLog, httpOptions);
    }
}