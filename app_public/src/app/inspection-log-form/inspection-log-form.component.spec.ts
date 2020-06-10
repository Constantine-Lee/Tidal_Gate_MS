import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionLogFormComponent } from './inspection-log-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { InspectionLogQuestionService } from '../question/inspectionLogQuestion.service';
import { QuestionControlService } from '../question/questionControl.service';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { LoggerModule, LoggerConfig, NGXLogger } from 'ngx-logger';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
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
        LoggerModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule
      ],
      declarations: [FormQuestionComponent, InspectionLogFormComponent],
      providers: [
        InspectionLogQuestionService,
        QuestionControlService,
        InspectionLogService,
        NGXLogger,
        LoggerConfig]
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
