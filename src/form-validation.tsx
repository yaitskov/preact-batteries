import { InputIf, ValiFieldLi } from './input-if';
import { Container, inject } from './inject-1k';
import { Validation, Validator } from './validation';

class MetaInput {
  constructor(public input: InputIf,
              public check: Validator,
              public fans: ValiFieldLi = []) {}
}

export class FormLevel {
  constructor(private validation: Validation) {}

  private data: Map<string, string> = new Map<string, string>();
  private liBuf: ValiFieldLi[] = [];
  private curInput: InputIf = null;
  private inputByName: Map<string, MetaInput> = new Map<string, MetaInput>();
  private onSubmit: (d: Map<string, string>) => void;

  add(input: InputIf): void {
    this.curInput = input;
    const props = input.props;
    this.inputByName[props.field] = new MetaInput(
      input, this.validation.build(props.svalid, props.field));
  }

  rm(input: InputIf): void {
    delete this.inputByName[input.props.field];
  }

  change(input, oldV, newV): void {
    const p = input.props;
    this.data[p.field] = newV;
    const meta = this.inputByName[p.field];
    if (meta) {
      meta.fans.forEach(f => f.dirty());
      const errors = meta.check.check(newV);
      if (errors.length) {
        meta.fans.forEach(f => f.invalid(errors));
      } else {
        meta.fans.forEach(f => f.valid());
      }
    }
  }

  setValue(data: Map<string, string>): void {
    this.data = data;
    Object.getOwnPropertyNames(data).forEach(pn => {
      const meta = this.inputByName[pn];
      if (meta) {
        meta.input.updateVal(data[pn]);
        //meta.input.valid();
        //meta.fans.forEach(f => f.valid());
      }
    });
    for (let [k,v] of this.inputByName) {
      if (!(k in data)) {
        v.empty();
      }
    }
  }

  setSubmit(callback: (d: Map<string, string>) => void) {
    this.onSubmit = callback;
  }

  public trySubmit(): void {
    // wait till validation status is known for all fields

  }

  addFan(fan: ValiFieldLi) {
    if (this.curInput) {
      this.inputByName[this.curInput.props.field].fans.push(fan);
    }
  }

  public flush(): void {
    if (this.curInput) {
      this.liBuf = [];
      this.curInput = null;
    } else {
      throw new Error('InputBox without input');
      //console.log("InputBox without input");
      //this.curInput.fans = this.liBuf;
    }
  }

  public noListeners(): void {
    if (this.liBuf.length) {
      throw new Error('input listeners is not empty');
    }
    if (this.curInput) {
      throw new Error('nested InputBox is not supported');
    }
  }
}

export class Valiform  {
  // @ts-ignore
  private $validation: Validation;
  private formStack: FormLevel[] = [];

  public newForm(): void {
    this.formStack.unshift(new FormLevel(this.$validation));
  }

  public endForm(): void {
    this.formStack.shift();
  }

  public topForm(): FormLevel {
    return this.formStack[0];
  }
}
