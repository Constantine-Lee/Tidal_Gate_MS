import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionBase } from '../question/questionBase';
import * as CustomEditor from '../../assets/build/ckeditor.js';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
})
export class FormQuestionComponent {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
  get isCheckBox() { return this.question.controlType == 'checkbox'; }
  get getCheckBoxFormArray() { return this.form.get(this.question.key)['controls']; }
  isDisabled: boolean = true;

  public Editor = CustomEditor;
  public model = {
    editorData: '<p></p><br/><p></p>'
  };
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
      toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full'],

      styles: [
        // This option is equal to a situation where no style is applied.
        'full',

        // This represents an image aligned to the left.
        'alignLeft'
      ]
    },
    licenseKey: '',
  };

  ngOnInit() {
    if (this.isCheckBox) {
      //console.log(this.question.checkboxes.length)
      this.getCheckBoxFormArray[this.question.checkboxes.length - 1].valueChanges.subscribe((v) => {        
        for (let i = 0; i < this.question.checkboxes.length - 1; i++) {  
          //console.log(this.getCheckBoxFormArray[i].value);        
          if(v) {
            this.getCheckBoxFormArray[i].disable(); 
            this.getCheckBoxFormArray[i].setValue(false);
            //console.log('second ' + this.getCheckBoxFormArray[i].value);
          }
          else {
            this.getCheckBoxFormArray[i].enable();
          } 
        }
      })
      //console.log( this.form.get(this.question.key)['controls'][4].disable() );
    }
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
  }
}
