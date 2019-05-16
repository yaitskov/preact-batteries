import { h } from 'preact';
import { MyCo } from 'component/my-component';
import { Container, inject } from 'injection/inject-1k';

import { InputBox } from 'component/form/input/input-box';
import { InputOk } from 'component/form/input/input-ok';
import { InputCheck } from 'input-check';
import { InpErr } from 'component/form/input/input-error';
import { InpHint } from 'component/form/input/input-hint';
import { IfErr } from 'component/form/validation/if-error';


export class PriorityField extends MyCo<{}, {}> {
  // @ts-ignore TS2564
  private $container: Container;

  wMnt() {
  }

  render() {
    const InputBoxI = inject(InputBox, this.$container);
    const InputOkI = inject(InputOk, this.$container);
    const CheckI = inject(InputCheck, this.$container);
    const InpErrI = inject(InpErr, this.$container);
    const IfErrI = inject(IfErr, this.$container);
    const InpHintI = inject(InpHint, this.$container);

    return <InputBoxI>
      <label>
        Priority
        <CheckI on="k" mit="min:1 max:10 !e i">
          <InputOkI a="priority" />
        </CheckI>
      </label>
      <InpErrI>
        <IfErrI check="min">priority must be positive</IfErrI>
        <IfErrI check="max">priority must be less than 11</IfErrI>
        <IfErrI check="!e">priority is required</IfErrI>
        <IfErrI check="i">priority must be a number</IfErrI>
      </InpErrI>
      <InpHintI>
        <p>enter priorty for the action</p>
      </InpHintI>
    </InputBoxI>;
  }
}
