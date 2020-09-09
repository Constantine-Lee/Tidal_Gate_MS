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
  get getCheckBoxFormArray() { return this.form.get(this.question.key)['controls']; }
  get getFormControl() { return this.form.get(this.question.key); }

  getContentChanged(change: any) {
    this.question.value = this.quillEditorRef.getContents();;
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
    editorInstance.setContents(this.question.value);
  }

  imageHandler = (image, callback) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/png, image/jpeg');
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
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          let base64: string = ctx.canvas.toDataURL('image/jpeg', 0.5);
          this.gateService.upload({ base64String: base64 }).subscribe(url => {
            const range = this.quillEditorRef.getSelection();
            this.quillEditorRef.insertEmbed(range.index, 'image', url);
          }
          );
        }
      } else {
        console.warn('You could only upload images.');
      }
    };
  }

  ngOnInit() {
   
    //check is CheckBox then disable first four checkbox, then subscribe to value changes, disable first four checkbox if 5th checkbox is true
    if (this.question.controlType == 'checkbox') {
      for(let i = 0; i < 4; i++){
        this.getCheckBoxFormArray[i].valueChanges.subscribe(v => (<CheckBoxQuestion>this.question).checkboxes[i].value = v);
      }
      if ((<CheckBoxQuestion>this.question).checkboxes.length == 5) {
        for (let i = 0; i < 4 ; i++) {
          if (this.getCheckBoxFormArray[4].value) {
            this.getCheckBoxFormArray[i].disable();
          }
          else { this.getCheckBoxFormArray[i].enable(); }
        }

        this.getCheckBoxFormArray[(<CheckBoxQuestion>this.question).checkboxes.length - 1].valueChanges.subscribe(v => {
          for (let i = 0; i < (<CheckBoxQuestion>this.question).checkboxes.length - 1; i++) {
            if (v) {
              this.getCheckBoxFormArray[i].disable();
              this.getCheckBoxFormArray[i].setValue(false);
              (<CheckBoxQuestion>this.question).checkboxes[i].value = false;
              (<CheckBoxQuestion>this.question).checkboxes[4].value = true;
            }
            else {
              this.getCheckBoxFormArray[i].enable();
            }
          }
        })
      }
    }
    else if (this.question.controlType == 'RTX') {}
    // others control
    else {
      this.getFormControl.valueChanges.subscribe(v => this.question.value = v);
    }
  }
}
