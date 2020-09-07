import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { MaintenanceLogFormComponent } from './maintenance-log-form/maintenance-log-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormQuestionComponent } from './question-form/form-question.component';

import { FooterComponent } from './footer/footer.component';
import { MaintenanceLogTableComponent } from './maintenance-log-table/maintenance-log-table.component';
import { GateTableComponent } from './gate-table/gate-table.component';
import { GateFormComponent } from './gate-form/gate-form.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './home/user.profile.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LogInterceptor } from './_helpers/log.interceptor';
import { AdminComponent } from './admin/admin.component';
import { UpdateMaintenanceLogComponent } from './update-maintenance-log/update-maintenance-log.component';

import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { FormsModule } from '@angular/forms';
import { InspectionLogFormComponent } from './inspection-log-form/inspection-log-form.component';
import { InspectionLogTableComponent } from './inspection-log-table/inspection-log-table.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';

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
    InspectionLogFormComponent,
    InspectionLogTableComponent
  ],
  imports: [
    QuillModule.forRoot(),
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
