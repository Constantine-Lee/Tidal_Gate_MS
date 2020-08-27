import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionControlService } from '.././question/questionControl.service';
import { InspectionLogQuestionService } from '../question/inspectionLogQuestion.service';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { InspectionLog } from '../_models/inspectionLog';
import { Router } from '@angular/router';
// import fade in animation
import { fadeInAnimation } from '../_animations/index';
import { QuestionBase } from '../question/questionType';

declare var $: any;

@Component({
  selector: 'app-inspection-log-form',
  templateUrl: './inspection-log-form.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class InspectionLogFormComponent implements OnInit {
  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  receive: boolean;
  loading = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';

  constructor(
    private qcs: QuestionControlService,
    private inspectionLogService: InspectionLogService,
    private router: Router) { }

  ngOnInit() {    
    this.inspectionLogService.getForms().subscribe(
      questions => {
        this.questions = questions;
        this.form = this.qcs.toFormGroup(questions);
        this.receive = true;
      }
    );
  }

  onSubmit(): void {

    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorString = 'Please fill in all the required fields.';
      $('#errorModal').modal('show');
      return;
    };

    this.loading = true;
    const formValue = this.form.getRawValue();
    this.questions.map(question => question.value = formValue[question.key]);

    const newInspectionLog = new InspectionLog({
      gate: formValue['Lokasi_Pintu_Air'],
      date_inspection: formValue['Tarikh'],
      question: JSON.stringify(this.questions)
    });

    this.inspectionLogService.addInspectionLog(newInspectionLog).subscribe(_ => this.router.navigate(['/inspectionLog']),
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
}
