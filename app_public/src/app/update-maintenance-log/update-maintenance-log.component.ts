import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { MaintenanceLogQuestionService } from '../_services/maintenanceLogQuestion.service';

import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { Location } from '@angular/common';
import { MaintenanceLog } from '../_models/maintenanceLog';

@Component({
  selector: 'app-update-maintenance-log',
  templateUrl: './update-maintenance-log.component.html'
})
export class UpdateMaintenanceLogComponent implements OnInit {
  @Input() maintenanceLog: MaintenanceLog;
  questions: QuestionBase<string>[] = [];
  form: FormGroup;

  constructor(private qcs: QuestionControlService, private maintenanceLogService: MaintenanceLogService, private location: Location) {
    
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.questions = JSON.parse(this.maintenanceLog.question);    
    this.form = this.qcs.toFormGroup(this.questions);    
  }

  ngOnDestroy(): void {
    console.log("Update Component Destroy");
  }

  onSubmit(): void {
    let formValue = this.form.getRawValue();
    console.log(formValue);
    this.questions.map(question => question.value = formValue[question.key]); 
    let newMaintenanceLog = new MaintenanceLog({
      _id: this.maintenanceLog._id,
      timestamp: this.maintenanceLog.timestamp,
      gate:formValue['Gate Name *'], 
      date_maintenance:formValue['Maintenance Date *'], 
      action_taken:formValue['Action Taken *'], 
      action_needed:formValue['Action Needed *'], 
      question:JSON.stringify(this.questions)});
    this.maintenanceLog.date_maintenance = formValue['Maintenance Date *'];
    this.maintenanceLog.question = JSON.stringify(this.questions);

    this.maintenanceLogService.updateMaintenanceLog(newMaintenanceLog).subscribe(res=> { this.goBack(); }, err => console.log(err));    
  }
}