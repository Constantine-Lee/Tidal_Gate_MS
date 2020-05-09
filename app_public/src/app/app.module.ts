import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { MaintenanceLogFormComponent } from './maintenance-log-form/maintenance-log-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormQuestionComponent } from './form-question/form-question.component';

import { FooterComponent } from './footer/footer.component';
import { MaintenanceLogTableComponent } from './maintenance-log-table/maintenance-log-table.component';
import { GateTableComponent } from './gate-table/gate-table.component';
import { GateFormComponent } from './gate-form/gate-form.component';

import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './home/user.profile.component';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LogInterceptor } from './_helpers/log.interceptor';
import { AdminComponent } from './admin/admin.component';
import { UpdateMaintenanceLogComponent } from './update-maintenance-log/update-maintenance-log.component';

import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { FormsModule } from '@angular/forms';
import { UpdateGateComponent } from './update-gate/update-gate.component';
import { InspectionLogFormComponent } from './inspection-log-form/inspection-log-form.component';
import { InspectionLogTableComponent } from './inspection-log-table/inspection-log-table.component';
import { UpdateInspectionLogComponent } from './update-inspection-log/update-inspection-log.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, 
]; 

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MaintenanceLogFormComponent,
    FormQuestionComponent,
    FooterComponent,
    MaintenanceLogTableComponent,
    GateTableComponent,
    GateFormComponent,
    LoginComponent,
    UserProfileComponent,
    AdminComponent,
    UpdateMaintenanceLogComponent,
    JwPaginationComponent,
    UpdateGateComponent,
    InspectionLogFormComponent,
    InspectionLogTableComponent,
    UpdateInspectionLogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    httpInterceptorProviders  
    // provider used to create fake backend
    //fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
