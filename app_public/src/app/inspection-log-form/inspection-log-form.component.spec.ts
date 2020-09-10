import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionLogFormComponent } from './inspection-log-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { QuestionControlService } from '../_services/questionControl.service';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormQuestionComponent } from '../question-form/form-question.component';

describe('InspectionLogFormComponent', () => {
  let component: InspectionLogFormComponent;
  let fixture: ComponentFixture<InspectionLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AppRoutingModule,        
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FormQuestionComponent, InspectionLogFormComponent],
      providers: [
        QuestionControlService,
        InspectionLogService
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
