import { QuestionBase } from './questionBase';

export class FullTextboxQuestion extends QuestionBase<string> {
  controlType = 'fullTextbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}