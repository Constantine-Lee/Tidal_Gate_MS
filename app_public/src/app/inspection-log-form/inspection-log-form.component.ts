import { Component, Input, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { InspectionLogQuestionService } from '../question/inspectionLogQuestion.service';
import { Observable } from 'rxjs';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { Location } from '@angular/common';
import { InspectionLog } from '../_models/inspectionLog';
import { Router, ActivatedRoute } from '@angular/router';
// import fade in animation
import { fadeInAnimation } from '../_animations/index';
import { DOCUMENT } from '@angular/common';
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
  error: string = 'Unknown Error Occurs... Operation Failed.';

  constructor(private service: InspectionLogQuestionService, private qcs: QuestionControlService, private inspectionLogService: InspectionLogService, private router: Router) {
  }

  ngOnInit(): void {
    this.questions = this.service.getQuestions();
    this.form = this.qcs.toFormGroup(this.questions);
    this.receive = true;
  }

  onSubmit(): void {    
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const formValue = this.form.getRawValue();
    this.questions.map(question => question.value = formValue[question.key]);

    const newInspectionLog = new InspectionLog({ gate: formValue['Lokasi_Pintu_Air'], date_inspection: formValue['Tarikh'], question: JSON.stringify(this.questions) });

    this.inspectionLogService.addInspectionLog(newInspectionLog).subscribe(_ => this.router.navigate(['/inspectionLog']),
      err => {
        console.log(err);
        if (err != undefined) {
          this.error = err;
        }
        this.loading = false;
        $('#errorModal').modal('show');
      });
  }
}
