import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as CustomEditor from '../../assets/build/ckeditor.js';
import { QuestionBase } from '../question/questionType.js';

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

    //TO DO: Refactor
    //check is CheckBox then disable first four checkbox, then subscribe to value changes, disable first four checkbox if 5th checkbox is true
    if (this.isCheckBox) {
      
      if (this.question.checkboxes.length == 5) {
        if (this.getCheckBoxFormArray[4].value) {
          this.getCheckBoxFormArray[0].disable();
          this.getCheckBoxFormArray[1].disable();  
          this.getCheckBoxFormArray[2].disable();
          this.getCheckBoxFormArray[3].disable();
        }
        else {
          this.getCheckBoxFormArray[0].enable();
          this.getCheckBoxFormArray[1].enable();
          this.getCheckBoxFormArray[2].enable();
          this.getCheckBoxFormArray[3].enable();
        }
        this.getCheckBoxFormArray[this.question.checkboxes.length - 1].valueChanges.subscribe((v) => {
          for (let i = 0; i < this.question.checkboxes.length - 1; i++) {
            console.log(this.getCheckBoxFormArray[i].value);
            if (v) {
              this.getCheckBoxFormArray[i].disable();
              this.getCheckBoxFormArray[i].setValue(false);
              //console.log('second ' + this.getCheckBoxFormArray[i].value);
            }
            else {
              this.getCheckBoxFormArray[i].enable();
            }
          }
        })
      }
      //console.log( this.form.get(this.question.key)['controls'][4].disable() );
    }
  }
}
