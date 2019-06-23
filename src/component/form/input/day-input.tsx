import { h } from 'preact';
import { time2Str } from 'util/my-time';
import { jne } from 'collection/join-non-empty';
import { U } from 'util/const';
import { MyCo } from 'component/my-component';
import { Valiform, FormLevel } from 'component/form/validation/form-validation';
import { InputOkP, InputIf } from 'component/form/validation/input-if';
import { Invalid } from 'component/form/validation/invalid';
import { DayPickr } from 'component/form/input/day-pickr';

import bulma from 'app/style/my-bulma.sass';

interface DayInputP extends InputOkP {
  min?: string | Date;
}

interface DayInputS {
  val: string;
}

export class DayInput extends MyCo<DayInputP, DayInputS> implements InputIf {
  // @ts-ignore
  $valiform: Valiform;
  // @ts-ignore
  form: FormLevel;

  constructor(props) {
    super(props);
    this.st = {val: time2Str(new Date())}
    this.onChng = this.onChng.bind(this);
  }

  public getProps(): InputOkP {
    return this.props;
  }

  chkN(): string {
    return U;
  }

  wMnt() {
    this.form = this.$valiform.topForm();
    this.form.add(this);
  }

  wUmt() {
    this.form.rm(this);
  }

  onChng(lastDate: string) {
    this.updateVal(lastDate);
  }

  updateVal(v: string) {
    this.form.change(this, this.st.val, v);
    this.st = {val: v};
  }

  render() {
    return <div class={bulma.control}>
      <DayPickr onChng={this.onChng}
                fmt="yyyy-MM-dd'T'HH:ii:ss.SSSZ"
                css={jne(bulma.input, this.props.cls)}
                val={this.st.val} />
    </div>;
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
