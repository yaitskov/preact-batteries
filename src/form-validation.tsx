import { InputIf, ValiFieldLi } from './input-if';
import { Container, inject } from './inject-1k';
import { Validation, Validator, Invalid } from './validation';

class MetaInput {
  public syncErrors: Invalid[] = [];
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
    this.inputByName.set(props.field, new MetaInput(
      input, this.validation.build(props.svalid, props.field)));
  }

  rm(input: InputIf): void {
    delete this.inputByName.get(input.props.field);
  }

  change(input, oldV, newV): void {
    const p = input.props;
    this.data.set(p.field, newV);
    const meta = this.inputByName.get(p.field);
    if (meta) {
      meta.fans.forEach(f => f.dirty());
      const errors = meta.syncErrors = meta.check.check(newV);
      if (errors.length) {
        meta.fans.forEach(f => f.invalid(errors));
      } else {
        meta.fans.forEach(f => f.valid());
      }
    }
  }

  setValue(data: Map<string, string>): void {
    this.data = data;
    for (let [k, _] of data) {
      const meta = this.inputByName.get(k);
      if (meta) {
        meta.input.updateVal(data.get(k));
      }
    }
    for (let [k, meta] of this.inputByName) {
      if (!data.has(k)) {
        meta.input.empty();
        meta.fans.forEach(f => f.empty());
      }
    }
  }

  setSubmit(callback: (d: Map<string, string>) => void) {
    this.onSubmit = callback;
  }

  public trySubmit(e): void {
    for (let [k, m] of this.inputByName) {
      if (m.syncErrors.length) {
        console.log('sync validators fails');
        return;
      }
    }
    this.onSubmit(e);
  }

  addFan(fan: ValiFieldLi) {
    if (this.curInput) {
      this.inputByName.get(this.curInput.props.field).fans.push(fan);
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
