import { h } from 'preact';
import { MyCo } from './my-component';
import { Valiform, FormLevel } from './form-validation';
import { InputOkP, InputIf } from './input-if';
import { Invalid } from './validation';

export class InputOk extends MyCo<InputOkP> implements InputIf {
  // @ts-ignore
  $valiform: Valiform;
  // @ts-ignore
  form: FormLevel;

  constructor(props) {
    super(props);
    this.state = {val: ''};
    this.onChng = this.onChng.bind(this);
  }

  wMnt() {
    this.form = this.$valiform.topForm();
    this.form.add(this);
  }

  wUmt() {
    this.form.rm(this);
  }

  onChng(e) {
    e.preventDefault();
    this.form.change(this, this.state.val, e.target.value);
    this.setState({val: e.target.value});
  }

  render(p, st) {
    return <input value={st.val} onChange={this.onChng} />;
  }

  updateVal(v: string) {
    this.form.change(this, null, v);
    this.setState({val: v});
  }

  empty() {
  }

  valid() {
  }

  dirty() {
  }

  invalid(er: Invalid[]) {
  }
}
