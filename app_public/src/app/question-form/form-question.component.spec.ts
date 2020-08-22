import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionComponent } from './form-question.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AppModule } from '../app.module';

describe('FormQuestionComponent', () => {
  let component: FormQuestionComponent;
  let fixture: ComponentFixture<FormQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, AppModule],
      declarations: [ FormQuestionComponent ],
           
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
