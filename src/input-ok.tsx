import { h } from 'preact';
import { U } from './const';
import { MyCo } from 'component/my-component';
import { Valiform, FormLevel } from './form-validation';
import { InputOkP, InputIf } from './input-if';
import { Invalid } from './invalid';

interface InputOkS {
  val: string;
}

export class InputOk extends MyCo<InputOkP, InputOkS> implements InputIf {
  // @ts-ignore
  $valiform: Valiform;
  // @ts-ignore
  form: FormLevel;

  constructor(props) {
    super(props);
    this.state = {val: ''};
    this.onChng = this.onChng.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  chkN(): string {
    return U;
  }

  public getProps(): InputOkP {
    return this.props;
  }

  wMnt() {
    this.form = this.$valiform.topForm();
    this.form.add(this);
  }

  wUmt() {
    this.form.rm(this);
  }

  onKeyUp(e) {
    console.log(`trigger validation check ${e}`);
    // set state some how
    this.form.checkFieldBy(this, ['k'], e.target.value);
  }

  onChng(e) {
    e.preventDefault();
    this.form.change(this, this.state.val, e.target.value);
    this.setState({val: e.target.value});
  }

  render(p, st) {
    return <input value={st.val} onChange={this.onChng} onKeyUp={this.onKeyUp} />;
  }

  updateVal(v: string) {
    this.form.change(this, '', v);
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
