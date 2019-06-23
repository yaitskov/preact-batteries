import { h } from 'preact';
import { time2Str, isoTime2Clock, replaceClock } from 'util/my-time';
import { jne } from 'collection/join-non-empty';
import { U } from 'util/const';
import { MyCo } from 'component/my-component';
import { Valiform, FormLevel } from 'component/form/validation/form-validation';
import { InputOkP, InputIf } from 'component/form/validation/input-if';
import { Invalid } from 'component/form/validation/invalid';
import { ClockPickr } from 'component/form/input/clock-pickr';

import bulma from 'app/style/my-bulma.sass';

interface ClockInputP extends InputOkP {}

interface ClockInputS {
  dateTime: string;
  timeView: string;
}

export class ClockInput extends MyCo<ClockInputP, ClockInputS> implements InputIf {
  // @ts-ignore
  $valiform: Valiform;
  // @ts-ignore
  form: FormLevel;

  constructor(props) {
    super(props);
    const now = time2Str(new Date());
    this.st = {dateTime: now, timeView: isoTime2Clock(now)};
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

  onChng(time: string) {
    this.updateVal(replaceClock(this.st.dateTime, time));
  }

  updateVal(dateTime: string) {
    this.form.change(this, this.st.dateTime, dateTime);
    this.st = {dateTime: dateTime,
               timeView: isoTime2Clock(dateTime)};
  }

  render() {
    return <div class={bulma.control}>
      <ClockPickr onChng={this.onChng}
                  css={jne(bulma.input, this.props.cls)}
                  val={this.st.timeView} />
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
