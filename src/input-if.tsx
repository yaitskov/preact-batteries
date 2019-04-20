import { Invalid } from './validation';

export interface InputOkP {
  style: string;
  cls: string;
  svalid: string;
  field: string;
}

export interface ValiFieldLi {
  valid();
  invalid(inv: Invalid[]);
  dirty();
  empty();
}

export interface InputIf extends ValiFieldLi {
  getProps(): InputOkP;
  updateVal(v: string);
}
