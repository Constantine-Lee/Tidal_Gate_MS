import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '.././question/questionBase';
import { QuestionControlService } from '.././question/questionControl.service';
import { MaintenanceLogQuestionService } from '../question/maintenanceLogQuestion.service';
import { Observable } from 'rxjs';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { Location } from '@angular/common';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../_animations';
import { DialogService } from '../_services/dialog.service';

import * as CustomEditor from '../../assets/build/ckeditor.js';
import * as SecondEditor from '../../assets/build/ckeditor.js';

import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

declare var $: any;

@Component({
  selector: 'app-maintenance-log-form',
  templateUrl: './maintenance-log-form.component.html',
  styleUrls: ['./maintenance-log-form.css'],

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class MaintenanceLogFormComponent implements OnInit, AfterViewInit {
  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  receive: boolean;
  loading = false;
  error: string = 'Unknown Error Occurs... Operation Failed.';
  config = {
    toolbar: {
      items: [
        'bold',
        'fontSize',
        'highlight',
        'alignment',
        'bulletedList',
        '|',
        'imageUpload',
        'undo',
        'redo'
      ]
    },
    language: 'en',
    image: {
      toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full'],

            styles: [
                // This option is equal to a situation where no style is applied.
                'full',

                // This represents an image aligned to the left.
                'alignLeft'
            ]
    },
    licenseKey: '',
  };

  public Editor = CustomEditor;
  public SecondEditor = CustomEditor;
  public model = {
    editorData: '<p></p><br/><p></p>'
};
  public secondData = '<p> fs</p><br/><p> </p>';

  public onChange({ editor }: ChangeEvent) {
    
    const data = editor.getData();
    console.log(data);
  }

  constructor(private service: MaintenanceLogQuestionService, private qcs: QuestionControlService, private maintenanceLogService: MaintenanceLogService, private router: Router, private dialogService: DialogService) {
  }

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
  @ViewChild('editor') editorComponent: CKEditorComponent;

    public getEditor() {
        // Warning: This may return "undefined" if the editor is hidden behind the `*ngIf` directive or
        // if the editor is not fully initialised yet.
        return this.editorComponent.editorInstance;
    }

  ngAfterViewInit(){
    const data = this.editorComponent;
    console.log(data);
  }
  onSubmit(): void {
    const data = this.Editor.getData;
    console.log(data);
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const formValue = this.form.getRawValue();
    this.questions.map(question => question.value = formValue[question.key]);

    const newMaintenanceLog = new MaintenanceLog({ gate: formValue['Gate Name *'], date_maintenance: formValue['Maintenance Date *'], action_taken: formValue['Action Taken *'], action_needed: formValue['Action Needed *'], question: JSON.stringify(this.questions) });

    this.maintenanceLogService.addMaintenanceLog(newMaintenanceLog)
      .subscribe(_ => this.router.navigate(['/maintenanceLog']),
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

