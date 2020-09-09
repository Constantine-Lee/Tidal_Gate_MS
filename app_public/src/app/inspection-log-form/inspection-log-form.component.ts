import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionControlService } from '../_services/questionControl.service';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { InspectionLog } from '../_models/inspectionLog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import fade in animation
import { fadeInAnimation } from '../_animations/index';
import { QuestionBase } from '../_models/questionType';
import { LoggingService } from '../_services/logging.service';

declare var $: any;

@Component({
  selector: 'app-inspection-log-form',
  templateUrl: './inspection-log-form.component.html',
  animations: [fadeInAnimation]
})
export class InspectionLogFormComponent implements OnInit {
  questions: QuestionBase[] = [];
  form: FormGroup;
  submitting = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';
  submitButtonLabel: string;
  inspectionLog: InspectionLog;

  constructor(
    private qcs: QuestionControlService,
    private inspectionLogService: InspectionLogService,
    private router: Router,
    private logger: LoggingService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.logger.info("Function: ngOnInit()");
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('inspectionLogID')) {
        this.inspectionLogService.getInspectionLogByID(params.get('inspectionLogID')).subscribe(i => this.initForm(i, 'Update'));
      }
      else {
        this.inspectionLogService.getForms().subscribe(i => this.initForm(i, 'Submit'));
      }
    });
  }

  initForm(i: InspectionLog, buttonLabel: string) {
    this.logger.info("Function: initForm(i: InspectionLog, buttonLabel: string)");
    this.inspectionLog = i;
    this.questions = this.inspectionLog.questions;
    this.form = this.qcs.toFormGroup(this.questions);
    this.submitButtonLabel = buttonLabel;
    this.logger.info("this.inspectionLog: " + JSON.stringify(this.inspectionLog, null, 2) + "this.submitButtonLabel: " + this.submitButtonLabel);
  }

  onSubmit(): void {
    this.logger.info("Function: onSubmit()");
    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorString = 'Please fill in all the required fields.';
      $('#errorModal').modal('show');
      return;
    };

    this.submitting = true;
    const formValue = this.form.getRawValue();
    this.logger.info("formValue: " + JSON.stringify(formValue, null, 2));
    this.inspectionLog.questions.map(q => q.value = formValue[q.key]);

    if (this.submitButtonLabel == 'Submit') {
      this.inspectionLogService.addInspectionLog(this.inspectionLog)
        .subscribe(
          _ => this.router.navigate(['/inspectionLog']),
          err => this.submitErrHandling(err));
    }
    else if (this.submitButtonLabel == 'Update') {
      this.inspectionLogService.updateInspectionLog(this.inspectionLog)
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
}
