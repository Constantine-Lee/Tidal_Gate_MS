import { QuestionBase } from './questionBase';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';

  constructor(options: {}) {
    super(options);
  }
}

export class GroupLabelQuestion extends QuestionBase<string> {
  controlType = 'groupLabel';  

  constructor(options: {}) {
    super(options);    
  }
}

export class DateQuestion extends QuestionBase<string> {
  controlType = 'date';  

  constructor(options: {}) {
    super(options);    
  }
}