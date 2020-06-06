import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { MaintenanceLogQuestionService } from '../question/maintenanceLogQuestion.service';
import { Observable } from 'rxjs';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../_animations';
import { DialogService } from '../_services/dialog.service';
import { NGXLogger } from 'ngx-logger';

//for modal
declare var $: any;

@Component({
  selector: 'app-maintenance-log-form',
  templateUrl: './maintenance-log-form.component.html',
  animations: [fadeInAnimation]
})
export class MaintenanceLogFormComponent implements OnInit {
  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  receive: boolean;
  loading = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';

  constructor(private service: MaintenanceLogQuestionService,
    private qcs: QuestionControlService,
    private maintenanceLogService: MaintenanceLogService,
    private router: Router,
    private dialogService: DialogService,
    private logger: NGXLogger) {
  }

  //get questions and transform to formGroup, mark the form as receieved
  ngOnInit(): void {
    this.questions = this.service.getQuestions();
    for (let question of this.questions) {
      this.logger.debug("question: " + JSON.stringify(question));
    }

    this.form = this.qcs.toFormGroup(this.questions);
    this.logger.info("this.form: " + this.form);

    this.receive = true;
  }

  onSubmit(): void {
    this.logger.log("Function: onSubmit()");

    let map = new Map();
    map.set('Action_Taken', []);
    map.set('Action_Needed', []);

    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorString = 'Please fill in all the required fields.';
      $('#errorModal').modal('show');
      return;
    };

    // start spinning on the button 
    this.loading = true;
    const formValue = this.form.getRawValue();
    this.logger.trace("formValue: " + formValue);

    // update the questions based on form control value
    for (let question of this.questions) {
      if (question.checkboxes != undefined) {
        question.checkboxes.forEach((checkbox, i) => {
          checkbox.value = formValue[question.key][i];
          if (checkbox.value) {
            //push the checked into corresponding array
            map.get(question.key).push(checkbox.label)
          };
        });
      }
      question.value = formValue[question.key]
    }

    for (let question of this.questions) {
      this.logger.debug("question: " + JSON.stringify(question));
    }

    // create string by reduce function act on the elements in the array
    const sActionTaken = map.get('Action_Taken').reduce((first, second) => first + ', ' + second);
    const sActionNeeded = map.get('Action_Needed').reduce((first, second) => first + ', ' + second);

    // create a new log
    const newMaintenanceLog = new MaintenanceLog({
      gate: formValue['Gate Name'],
      date_maintenance: formValue['Maintenance Date'],
      action_taken: sActionTaken,
      action_needed: sActionNeeded,
      question: JSON.stringify(this.questions)
    });

    // call service to add Maintenance Log, route to Table or show error modal
    this.maintenanceLogService.addMaintenanceLog(newMaintenanceLog)
      .subscribe(_ => this.router.navigate(['/maintenanceLog']),
        err => {
          console.log(err);
          if (err != undefined) {
            this.errorString = err;
          }
          else {
            this.errorString = 'Unknown Error Occurs... Operation Failed.';
          }
          this.loading = false;
          $('#errorModal').modal('show');
        });
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    //if (!this.crisis || this.crisis.name === this.editName) {
    return true;
    // }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    //return this.dialogService.confirm('Discard changes?');
  }
}

