import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '.././question/questionControl.service';

import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { fadeInAnimation } from '../_animations';
import { QuestionBase, CheckBoxQuestion } from '../question/questionType';
import { LoggingService } from '../_services/logging.service';
declare var $: any;

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
  loading = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private qcs: QuestionControlService,
    private maintenanceLogService: MaintenanceLogService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.getMaintenanceLogByID(params.get('maintenanceLogID')))
    ).subscribe();
  }

  ngOnDestroy(): void {
    //console.log("Update Component Destroy");
  }

  async getMaintenanceLogByID(id: string) {
    await this.maintenanceLogService.getMaintenanceLogByID(id)
      .then(maintenanceLog => this.maintenanceLog = maintenanceLog);
    this.questions = JSON.parse(this.maintenanceLog.question);

    /*
    console.log(this.questions);
    let gateName = this.questions.find(obj => {
      return obj.key == 'Gate Name *';
    })
    console.log(gateName);
    */

    this.form = this.qcs.toFormGroup(JSON.parse(this.maintenanceLog.question));
    this.receive = true;
  }

  refreshPage() {
    this.ngOnInit();
  }

  onSubmit(): void {
    this.logger.info("Function: onSubmit()");

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
    this.logger.debug("formValue: " + formValue);

    // update the questions based on form control value
    for (let question of this.questions) {
      if ((<CheckBoxQuestion>question).checkboxes != undefined) {
        (<CheckBoxQuestion>question).checkboxes.forEach((checkbox, i) => {
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

    const newMaintenanceLog = new MaintenanceLog({
      _id: this.maintenanceLog._id,
      timestamp: this.maintenanceLog.timestamp,
      gate: formValue['Gate Name'],
      date_maintenance: formValue['Maintenance Date'],
      action_taken: sActionTaken,
      action_needed: sActionNeeded,
      question: JSON.stringify(this.questions)
    });

    this.maintenanceLogService.updateMaintenanceLog(newMaintenanceLog)
      .subscribe(_ => this.router.navigate(['/maintenanceLog']),
        err => {
          console.log(err);
          if (err != undefined) {
            this.errorString = err.error;
          }
          else {
            this.errorString = 'Unknown Error Occurs... Operation Failed.';
          }
          this.loading = false;
          $('#errorModal').modal('show');
        });
  }
}