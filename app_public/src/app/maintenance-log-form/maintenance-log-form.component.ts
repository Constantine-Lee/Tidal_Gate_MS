import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { MaintenanceLogQuestionService } from '../_services/maintenanceLogQuestion.service';
import { Observable } from 'rxjs';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { Location } from '@angular/common';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-log-form',
  templateUrl: './maintenance-log-form.component.html',
})
export class MaintenanceLogFormComponent implements OnInit {
  questions: QuestionBase<string>[] = [];
  form: FormGroup;

  constructor(private service: MaintenanceLogQuestionService, private qcs: QuestionControlService, private maintenanceLogService: MaintenanceLogService, private router: Router) {

  }

  ngOnInit(): void {
    this.questions = this.service.getQuestions();
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    this.questions.map(question => question.value = formValue[question.key]);

    const newMaintenanceLog = new MaintenanceLog({ gate: formValue['Gate Name *'], date_maintenance: formValue['Maintenance Date *'], action_taken: formValue['Action Taken *'], action_needed: formValue['Action Needed *'], question: JSON.stringify(this.questions) });

    this.maintenanceLogService.addMaintenanceLog(newMaintenanceLog)
    .subscribe(_ => this.router.navigate(['/maintenanceLog']));
  }
}

