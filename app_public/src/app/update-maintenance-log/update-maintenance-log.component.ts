import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { MaintenanceLogQuestionService } from '../question/maintenanceLogQuestion.service';

import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { Location } from '@angular/common';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { fadeInAnimation } from '../_animations';

@Component({
  selector: 'app-update-maintenance-log',
  templateUrl: './update-maintenance-log.component.html',
    
  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class UpdateMaintenanceLogComponent implements OnInit {
  maintenanceLog: MaintenanceLog;
  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  receive: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router, private qcs: QuestionControlService, private maintenanceLogService: MaintenanceLogService) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.getMaintenanceLogByID(params.get('maintenanceLogID')))
    ).subscribe();       
  }

  ngOnDestroy(): void {
    console.log("Update Component Destroy");
  }

  async getMaintenanceLogByID(id: string) {
    await this.maintenanceLogService.getMaintenanceLogByID(id)
        .then(maintenanceLog => this.maintenanceLog = maintenanceLog);     
    this.questions = JSON.parse(this.maintenanceLog.question);
    this.form = this.qcs.toFormGroup(JSON.parse(this.maintenanceLog.question));
    this.receive = true;
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

    this.maintenanceLogService.updateMaintenanceLog(newMaintenanceLog).subscribe(_=> { this.router.navigate(['/maintenanceLog']); });    
  }
}