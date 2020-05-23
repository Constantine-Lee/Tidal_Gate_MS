import { QuestionBase } from './questionBase';

export class CheckBoxQuestion extends QuestionBase<string> {
  controlType = 'checkbox';
  checkboxes: {key: string, label: string, value: boolean}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.checkboxes = options['checkboxes'] || [];
    
  }
}