export class QuestionBase {
  controlType: string;
  value: string;
  key: string;
  label: string;
  required: boolean;
  order: number;

  constructor(init: {
    key?: string,
    order?: number,
    required?: boolean,
    label?: string,
    value?: string,
  }
  ) {
    this.key = init.key;
    this.order = init.order;
    this.required = init.required || false;
    this.label = init.label || '';
    this.value = init.value || undefined;
  }
}

export class TextboxQuestion extends QuestionBase {
  controlType = 'textbox';
  constructor(init: {}) {
    super(init);
  }
}

export class CategoryLabel extends QuestionBase {
  controlType = 'groupLabel';
  constructor(init: {}) {
    super(init);
  }
}

export class DateQuestion extends QuestionBase {
  controlType = 'date';
  constructor(init: {}) {
    super(init);
  }
}

export class DropdownQuestion extends QuestionBase {
  controlType = 'dropdown';
  options: { key: string, value: string }[];
  constructor(init: {}) {
    super(init);
    this.options = init['options'] || [];
  }
}

export class RTXQuestion extends QuestionBase {
  controlType = 'RTX';
  constructor(options: {} = {}) {
    super(options);
  }
}

export class CheckBoxQuestion extends QuestionBase {
  controlType = 'checkbox';
  checkboxes: { key: string, label: string, value: boolean }[] = [];
  constructor(options: {} = {}) {
    super(options);
    this.checkboxes = options['checkboxes'] || [];
  }
}

export class FullTextboxQuestion extends QuestionBase {
  controlType = 'fullTextbox';
  constructor(options: {} = {}) {
    super(options);    
  }
}