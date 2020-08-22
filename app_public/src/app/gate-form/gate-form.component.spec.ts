import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateFormComponent } from './gate-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GateQuestionService } from '../question/gateQuestion.service';
import { QuestionControlService } from '../question/questionControl.service';
import { GateService } from '../_services/gate.service';
import { AuthenticationService } from '../_services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormQuestionComponent } from '../question-form/form-question.component';

describe('GateFormComponent', () => {
  let component: GateFormComponent;
  let fixture: ComponentFixture<GateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AppRoutingModule,        
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FormQuestionComponent, GateFormComponent ],
      providers: [
        GateQuestionService, 
        QuestionControlService, 
        GateService, 
        AuthenticationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
