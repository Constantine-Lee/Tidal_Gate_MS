import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../_services/questionControl.service';
import { Observable } from 'rxjs';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fadeInAnimation } from '../_animations';
import { DialogService } from '../_services/dialog.service';
import { QuestionBase, CheckBoxQuestion } from '../_models/questionType';
import { LoggingService } from '../_services/logging.service';

//for modal
declare var $: any;

@Component({
  selector: 'app-maintenance-log-form',
  templateUrl: './maintenance-log-form.component.html',
  animations: [fadeInAnimation]
})
export class MaintenanceLogFormComponent implements OnInit {
  questions: QuestionBase[] = [];
  form: FormGroup;
  submitting = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';
  submitButtonLabel: string;
  maintenanceLog: MaintenanceLog;

  constructor(

    private qcs: QuestionControlService,
    private maintenanceLogService: MaintenanceLogService,
    private router: Router,
    //private dialogService: DialogService,
    private logger: LoggingService,
    private route: ActivatedRoute) { }

  //get questions and transform to formGroup, mark the form as receieved
  ngOnInit(): void {
    this.logger.info("Function: ngOnInit()");
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.has('maintenanceLogID')){
        this.maintenanceLogService.getMaintenanceLogByID(params.get('maintenanceLogID')).subscribe(m => this.initForm(m, 'Update'));
      }
      else {
        this.maintenanceLogService.getForms().subscribe(m => this.initForm(m, 'Submit'));
      }
    });
  }

  initForm(m: MaintenanceLog, buttonLabel: string){
    this.logger.info("Function: initForm(m: MaintenanceLog, buttonLabel: string)");
    this.maintenanceLog = m;
    this.questions = m.questions;
    this.form = this.qcs.toFormGroup(this.questions);
    this.submitButtonLabel = buttonLabel;
    this.logger.debug("this.maintenanceLog: " + JSON.stringify(this.maintenanceLog, null, 2) + "this.submitButtonLabel: " + this.submitButtonLabel);
  }

  onSubmit(): void {
    this.logger.info("Function: onSubmit()");

    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorString = 'Please fill in all the required fields.';
      $('#errorModal').modal('show');
      return;
    };

    // start spinning on the button 
    this.submitting = true;
    const formValue = this.form.getRawValue();
    this.logger.info("formValue: " + JSON.stringify(formValue, null, 2));
    this.maintenanceLog.questions.forEach(q => {
      if(q.controlType == 'checkbox') {
        (<CheckBoxQuestion>q).checkboxes.forEach((checkbox, i) => {
          checkbox.value = formValue[q.key][i];
        });
      }
      else {
        q.value = formValue[q.key];
      }
    })

    if (this.submitButtonLabel == 'Submit') {
      this.maintenanceLogService.addMaintenanceLog(this.maintenanceLog)
        .subscribe(
          _ => this.router.navigate(['/inspectionLog']),
          err => this.submitErrHandling(err));
    }
    else if (this.submitButtonLabel == 'Update') {
      this.maintenanceLogService.updateMaintenanceLog(this.maintenanceLog)
        .subscribe(
          _ => this.router.navigate(['/inspectionLog']),
          err => this.submitErrHandling(err));
    }
  }

  submitErrHandling(err) {
    console.log(err);
    if (err != undefined) {
      this.errorString = err.error;
    }
    else {
      this.errorString = 'Unknown Error Occurs... Operation Failed.';
    }
    this.submitting = false;
    $('#errorModal').modal('show');
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

