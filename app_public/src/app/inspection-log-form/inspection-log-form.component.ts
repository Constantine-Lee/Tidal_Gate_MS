import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { InspectionLogQuestionService } from '../_services/inspectionLogQuestion.service';
import { Observable } from 'rxjs';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { Location } from '@angular/common';
import { InspectionLog } from '../_models/inspectionLog';

@Component({
  selector: 'app-inspection-log-form',
  templateUrl: './inspection-log-form.component.html'
})
export class InspectionLogFormComponent implements OnInit {
  questions: QuestionBase<string>[] = [];
  form: FormGroup; 

  constructor(private service: InspectionLogQuestionService, private qcs: QuestionControlService, private inspectionLogService:InspectionLogService, private location: Location) {
    this.questions = service.getQuestions();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit(): void {
    let formValue = this.form.getRawValue();
    this.questions.map(question => question.value = formValue[question.key]);    
    
    let newInspectionLog = new InspectionLog({gate:formValue['Lokasi *'], date_inspection:formValue['Tarikh*'], question:JSON.stringify(this.questions)});

    console.log(newInspectionLog);
    this.inspectionLogService.addInspectionLog(newInspectionLog).subscribe(res => console.log(res), err => console.log(err));
  }
}
