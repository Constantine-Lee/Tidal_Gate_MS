import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { InspectionLogQuestionService } from '../_services/inspectionLogQuestion.service';
import { Observable } from 'rxjs';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { Location } from '@angular/common';
import { InspectionLog } from '../_models/inspectionLog';
import { Router, ActivatedRoute } from '@angular/router';
// import fade in animation
import { fadeInAnimation } from '../_animations/index';

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

  constructor(private service: InspectionLogQuestionService, private qcs: QuestionControlService, private inspectionLogService: InspectionLogService, private router: Router) {
  }

  ngOnInit(): void {
    this.questions = this.service.getQuestions();
    this.form = this.qcs.toFormGroup(this.questions);
    this.receive = true;
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    this.questions.map(question => question.value = formValue[question.key]);
    
    const newInspectionLog = new InspectionLog({ gate: formValue['Lokasi *'], date_inspection: formValue['Tarikh*'], question: JSON.stringify(this.questions) });

    this.inspectionLogService.addInspectionLog(newInspectionLog).subscribe(_ =>this.router.navigate(['/inspectionLog']));
  }
}
