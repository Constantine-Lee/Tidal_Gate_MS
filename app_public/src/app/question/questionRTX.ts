import { QuestionBase } from './questionBase';

export class RTXQuestion extends QuestionBase<string> {
  controlType = 'RTX';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}