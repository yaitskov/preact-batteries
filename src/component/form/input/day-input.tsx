import { h } from 'preact';
import { time2Str, isoTime2Day, replaceDay } from 'util/my-time';
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
  dateTime: string;
  dayView: string;
}

export class DayInput extends MyCo<DayInputP, DayInputS> implements InputIf {
  // @ts-ignore
  $valiform: Valiform;
  // @ts-ignore
  form: FormLevel;

  constructor(props) {
    super(props);
    const now = time2Str(new Date());
    this.st = {dateTime: now, dayView: isoTime2Day(now)};
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

  onChng(day: string) {
    this.updateVal(replaceDay(this.st.dateTime, day));
  }

  updateVal(dateTime: string) {
    this.form.change(this, this.st.dateTime, dateTime);
    this.st = {dateTime: dateTime, dayView: isoTime2Day(dateTime)};
  }

  render() {
    return <DayPickr onChng={this.onChng}
                     fmt="yyyy-MM-dd"
                     css={jne(bulma.input, this.props.cls)}
                     val={this.st.dayView} />;
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
