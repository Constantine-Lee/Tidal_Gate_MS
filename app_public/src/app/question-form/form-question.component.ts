import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase, CheckBoxQuestion } from '../_models/questionType.js';
import { LoggingService } from '../_services/logging.service.js';
import { GateService } from '../_services/gate.service.js';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
})
export class FormQuestionComponent {
  constructor(    
    private gateService: GateService,
    private logger: LoggingService
  ) { }

  @Input() question: QuestionBase;
  @Input() form: FormGroup;
  quillEditorRef;
  modules = { toolbar: [{ header: 1 }, { list: 'ordered' }, { image: 1 }] };

  get isValid() { return this.form.controls[this.question.key].valid; }
  get isCheckBox() { return (<CheckBoxQuestion>this.question).controlType == 'checkbox'; }
  get getCheckBoxFormArray() { return this.form.get(this.question.key)['controls']; }

  getContentChanged(change: any) {
    console.log(change);
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    console.log(this.quillEditorRef)
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }

  imageHandler = (image, callback) => {
    const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();

      // Listen upload local image and save to server
      input.onchange = () => {
        const fileInput = input.files[0];

        // file type is only image.
        if (/^image\//.test(fileInput.type)) {
          let width: number = 150;
          let height: number = 150;

          const img = new Image();
          img.src = URL.createObjectURL(fileInput);
          img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = img.width;
            elem.height = img.height;
            const ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
      
            let base64: string = ctx.canvas.toDataURL('image/jpeg', 0.5 );
            this.logger.debug(base64);
            this.gateService.upload({ base64String: base64 }).subscribe(_ => {
              const range = this.quillEditorRef.getSelection();
              this.quillEditorRef.insertEmbed(range.index, 'image', base64);
            }
            );
          }
        } else {
          console.warn('You could only upload images.');
        }
      };
  }

  ngOnInit() {
    //TO DO: Refactor
    //check is CheckBox then disable first four checkbox, then subscribe to value changes, disable first four checkbox if 5th checkbox is true
    if (this.isCheckBox) {

      if ((<CheckBoxQuestion>this.question).checkboxes.length == 5) {
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
        this.getCheckBoxFormArray[(<CheckBoxQuestion>this.question).checkboxes.length - 1].valueChanges.subscribe((v) => {
          for (let i = 0; i < (<CheckBoxQuestion>this.question).checkboxes.length - 1; i++) {
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
