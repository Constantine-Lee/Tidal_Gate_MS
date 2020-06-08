import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { InspectionLog } from '../_models/inspectionLog';
import { fadeInAnimation } from '../_animations';
declare var $: any;

@Component({
  selector: 'app-update-inspection-log',
  templateUrl: './update-inspection-log.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class UpdateInspectionLogComponent implements OnInit {
  inspectionLog: InspectionLog;
  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  receive: boolean;
  loading = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';

  constructor(private route: ActivatedRoute,
    private router: Router, private inspectionLogService: InspectionLogService, private qcs: QuestionControlService, ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.getInspectionLogByID(params.get('inspectionLogID')))
    ).subscribe();
  }

  ngOnDestroy(): void {
    console.log("Update Component Destroy");
  }

  async getInspectionLogByID(id: string) {
    await this.inspectionLogService.getInspectionLogByID(id)
      .then(inspectionLog => this.inspectionLog = inspectionLog);
    this.questions = JSON.parse(this.inspectionLog.question);

    this.form = this.qcs.toFormGroup(this.questions);
    this.receive = true;
  }

  refreshPage(){
    this.ngOnInit();
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
      _id: this.inspectionLog._id,
      timestamp: this.inspectionLog.timestamp,
      gate: formValue['Lokasi_Pintu_Air'],
      date_inspection: formValue['Tarikh'],
      question: JSON.stringify(this.questions)
    });

    this.inspectionLogService.updateInspectionLog(newInspectionLog).subscribe(_ => this.router.navigate(['/inspectionLog']),
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