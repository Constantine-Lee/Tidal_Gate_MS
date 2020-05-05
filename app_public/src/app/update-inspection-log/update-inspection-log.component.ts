import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { InspectionLogQuestionService } from '../_services/inspectionLogQuestion.service';

import { InspectionLogService } from '../_services/inspectionLog.service';
import { Location } from '@angular/common';
import { InspectionLog } from '../_models/inspectionLog';

@Component({
  selector: 'app-update-inspection-log',
  templateUrl: './update-inspection-log.component.html'
})
export class UpdateInspectionLogComponent implements OnInit {
  @Input() inspectionLog: InspectionLog;
  questions: QuestionBase<string>[] = [];
  form: FormGroup;

  constructor(private qcs: QuestionControlService, private inspectionLogService: InspectionLogService, private location: Location) {

  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    console.log(this.inspectionLog.question);
    this.questions = JSON.parse(this.inspectionLog.question);
    console.log(this.questions);
    this.form = this.qcs.toFormGroup(this.questions);
  }

  ngOnDestroy(): void {
    console.log("Update Component Destroy");
  }

  onSubmit(): void {
    let formValue = this.form.getRawValue();
    console.log(formValue);
    this.questions.map(question => question.value = formValue[question.key]);
    let newInspectionLog = new InspectionLog({
      _id: this.inspectionLog._id,
      timestamp: this.inspectionLog.timestamp,
      gate: formValue['Gate Name *'],
      date_inspection: formValue['Maintenance Date *'],      
      question: JSON.stringify(this.questions)
    });

    this.inspectionLogService.updateInspectionLog(newInspectionLog).subscribe(res => { this.goBack(); }, err => console.log(err));
  }
}