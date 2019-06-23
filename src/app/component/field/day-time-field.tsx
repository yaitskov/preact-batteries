import { h } from 'preact';

import { jne } from 'collection/join-non-empty';
import { CheckOn, ValidatorList } from 'component/form/validation/input-check-def';
import { TransCom, TransComS } from 'i18n/trans-component';
import { InputBox } from 'component/form/input/input-box';
import { InputCheck } from 'component/form/validation/input-check';
import { InpErr } from 'component/form/validation/input-error';
import { DefaultErr } from 'component/form/validation/default-error';
import { DayInput } from 'component/form/input/day-input';
import { ClockInput } from 'component/form/input/clock-input';

import bulma from 'app/style/my-bulma.sass';
import dayTimeField from 'app/component/field/day-time-field.sass';

export interface DayTimeFieldP {
  a: string;
  t$lbl: string;
  min?: string | Date;
  css?: string;
  on?: CheckOn; // default on change
  mit?: ValidatorList; // default e! =. not empty
}

export class DayTimeField extends TransCom<DayTimeFieldP, TransComS> {
  constructor(props) {
    super(props);
    this.st = {at: this.at()};
  }

  render() {
    const [DefaultErrI, InputBoxI, DayInputI, CheckI] =
      this.c4(DefaultErr, InputBox, DayInput, InputCheck);
    const [InpErrI, ClockInputI] = this.c2(InpErr, ClockInput);

    return <InputBoxI>
      <label>
        {this.props.t$lbl}
        <CheckI on={this.props.on || "c"}
                mit={this.props.mit || "!e"}>
          <div class={jne(bulma.control, dayTimeField.dayTime)}>
            <DayInputI a={this.props.a} min={this.props.min} />
            <ClockInputI a={this.props.a} />
          </div>
        </CheckI>
      </label>
      <InpErrI>
        <DefaultErrI/>
      </InpErrI>
    </InputBoxI>;
  }

  at(): string[] { return []; }
}
