import { Component,OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { MaintenanceLogQuestionService } from '../question/maintenanceLogQuestion.service';
import { Observable } from 'rxjs';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../_animations';
import { DialogService } from '../_services/dialog.service';
declare var $: any;

@Component({
  selector: 'app-maintenance-log-form',
  templateUrl: './maintenance-log-form.component.html',  
  animations: [fadeInAnimation]
})
export class MaintenanceLogFormComponent implements OnInit {
    
  //fields
  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  receive: boolean;
  loading = false;
  errorString: string = 'Unknown Error Occurs... Operation Failed.';
  //

  constructor(private service: MaintenanceLogQuestionService, private qcs: QuestionControlService, private maintenanceLogService: MaintenanceLogService, private router: Router, private dialogService: DialogService) {
  }

  //get questions and transform to formGroup, mark the form as receieved
  ngOnInit(): void {
    this.questions = this.service.getQuestions();    
    this.form = this.qcs.toFormGroup(this.questions);
    this.receive = true;
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

  onSubmit(): void {
    
    let arrActionTaken: any[] = [];
    let arrActionNeeded: any[] = [];

    // stop here if form is invalid
    if (this.form.invalid) {
      this.errorString = 'Please fill in all the required fields.';
      $('#errorModal').modal('show');
      //this.errorString = 'Unknown Error Occurs... Operation Failed.';
      return;
    }
    
    // start spinning on the button 
    this.loading = true;
    const formValue = this.form.getRawValue();

    // update the questions based on form control value
    this.questions.map(question => {
      if (question.key == 'Action_Taken') {
        question.checkboxes.map((checkbox, i) => {
          checkbox.value = formValue[question.key][i];
          if (checkbox.value) { arrActionTaken.push(checkbox.label) };
        });
      }
      else if (question.key == 'Action_Needed') {
        question.checkboxes.map((checkbox, i) => {
          checkbox.value = formValue[question.key][i];
          if (checkbox.value) { arrActionNeeded.push(checkbox.label) };
        });
      }
      question.value = formValue[question.key]
    });

    // creat string
    const sActionTaken = arrActionTaken.reduce((first, second) => first + ', ' + second);
    const sActionNeeded = arrActionNeeded.reduce((first, second) => first + ', ' + second);

    // create a new log
    const newMaintenanceLog = new MaintenanceLog({ gate: formValue['Gate Name *'], date_maintenance: formValue['Maintenance Date *'], action_taken: sActionTaken, action_needed: sActionNeeded, question: JSON.stringify(this.questions) });

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
}

