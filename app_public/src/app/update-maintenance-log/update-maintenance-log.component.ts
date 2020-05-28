import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';

import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { fadeInAnimation } from '../_animations';
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
  error: string = 'Unknown Error Occurs... Operation Failed.';

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
    //console.log("Update Component Destroy");
  }

  async getMaintenanceLogByID(id: string) {
    await this.maintenanceLogService.getMaintenanceLogByID(id)
        .then(maintenanceLog => this.maintenanceLog = maintenanceLog);   
        console.log(this.maintenanceLog.question);  
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

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    
    this.questions.map(question => question.value = formValue[question.key]); 
    const newMaintenanceLog = new MaintenanceLog({
      _id: this.maintenanceLog._id,
      timestamp: this.maintenanceLog.timestamp,
      gate:formValue['Gate Name *'], 
      date_maintenance:formValue['Maintenance Date *'], 
      action_taken:formValue['Action Taken *'], 
      action_needed:formValue['Action Needed *'], 
      question:JSON.stringify(this.questions)});
    this.maintenanceLog.date_maintenance = formValue['Maintenance Date *'];
    this.maintenanceLog.question = JSON.stringify(this.questions);

    this.maintenanceLogService.updateMaintenanceLog(newMaintenanceLog).subscribe(_ => this.router.navigate(['/maintenanceLog']),
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