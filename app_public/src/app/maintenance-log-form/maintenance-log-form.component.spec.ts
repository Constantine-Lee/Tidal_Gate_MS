import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLogFormComponent } from './maintenance-log-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { MaintenanceLogQuestionService } from '../question/maintenanceLogQuestion.service';
import { QuestionControlService } from '../_services/questionControl.service';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { Router } from '@angular/router';
import { FormQuestionComponent } from '../question-form/form-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('MaintenanceLogFormComponent', () => {
  let component: MaintenanceLogFormComponent;
  let fixture: ComponentFixture<MaintenanceLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [        
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AppRoutingModule,        
        FormsModule, 
        ReactiveFormsModule
          
      ],
      declarations: [FormQuestionComponent, MaintenanceLogFormComponent],
      providers: [
        MaintenanceLogQuestionService,
        QuestionControlService,
        MaintenanceLogService        
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
