export class QuestionBase<T> {
  controlType: string;
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;

  constructor(init: {
    key?: string,
    order?: number,
    required?: boolean,
    label?: string,
    value?: T,
  }
  ) {
    this.key = init.key;
    this.order = init.order;
    this.required = init.required || false;
    this.label = init.label || '';
    this.value = init.value || undefined;
  }
}

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  constructor(init: {}) {
    super(init);
  }
}

export class CategoryLabel extends QuestionBase<string> {
  controlType = 'groupLabel';
  constructor(init: {}) {
    super(init);
  }
}

export class DateQuestion extends QuestionBase<string> {
  controlType = 'date';
  constructor(init: {}) {
    super(init);
  }
}

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: { key: string, value: string }[];
  constructor(init: {}) {
    super(init);
    this.options = init['options'] || [];
  }
}

export class RTXQuestion extends QuestionBase<string> {
  controlType = 'RTX';
  constructor(options: {} = {}) {
    super(options);
  }
}

export class CheckBoxQuestion extends QuestionBase<string> {
  controlType = 'checkbox';
  checkboxes: { key: string, label: string, value: boolean }[] = [];
  constructor(options: {} = {}) {
    super(options);
    this.checkboxes = options['checkboxes'] || [];
  }
}

export class FullTextboxQuestion extends QuestionBase<string> {
  controlType = 'fullTextbox';
  constructor(options: {} = {}) {
    super(options);    
  }
}