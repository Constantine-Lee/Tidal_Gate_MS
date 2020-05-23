export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    options: {key: string, value: string}[];
    checkboxes: {key: string, label: string, value: boolean}[];

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        type?: string,
        checkboxes?: {key: string, label: string, value: boolean}[]
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || ''; 
      this.checkboxes = options.checkboxes || [];
    }
  }