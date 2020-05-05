import { QuestionBase } from './questionBase';

export class GroupLabelQuestion extends QuestionBase<string> {
  controlType = 'groupLabel';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}