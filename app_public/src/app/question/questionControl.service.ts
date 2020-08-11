import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, ValidatorFn } from '@angular/forms';

import { QuestionBase } from './questionBase';
import { CheckBoxQuestion } from './questionCheckBox';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<string>[]) {
    let group: any = {};
    //console.log(questions);

    questions.forEach(question => {

      // checkbox control
      if (question.controlType == 'checkbox') {

        let fG = (<CheckBoxQuestion>question).checkboxes.map((checkbox) =>
          new FormControl(checkbox.value)
        )
        group[question.key] = new FormArray(fG, this.minSelectedCheckboxes(1));
      }
      // other control
      else {
        group[question.key] = question.required ?         
                              new FormControl(question.value || '', Validators.required) : 
                              new FormControl(question.value || '');
      };

    });
    //console.log(group);
    return new FormGroup(group);
  }

  // validator for checkboxes
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }
}