import { h } from 'preact';
import { MyCo } from './my-component';
import { Container, inject } from './inject-1k';
import { Invalid } from './validation';
import { postJ } from './abortable-fetch';
import { InputBox } from './input-box';
import { InputOk } from './input-ok';
import { InputCheck } from './input-check';
import { InpErr } from './input-error';
import { InpHint } from './input-hint';
import { IfErr } from './if-error';
import { DefaultErr } from './default-error';


interface Errors {
  errors: Invalid[];
}

export class ActionField extends MyCo<{}, {}> {
  // @ts-ignore TS2564
  private $container: Container;

  wMnt() {
  }

  render() {
    const DefaultErrI = inject(DefaultErr, this.$container);
    const InputBoxI = inject(InputBox, this.$container);
    const InputOkI = inject(InputOk, this.$container);
    const CheckI = inject(InputCheck, this.$container);
    const InpErrI = inject(InpErr, this.$container);
    const IfErrI = inject(IfErr, this.$container);
    const InpHintI = inject(InpHint, this.$container);

    return <InputBoxI>
      <label>
        Action
        <CheckI on="c" mit="r:^.{1,17}$ !e">
          <CheckI on="s" mit={(v) => postJ('/unique-action', {value: v}).tn<Errors>(e => e.json()).tn(e => e.errors) }>
            <InputOkI a="action" />
          </CheckI>
        </CheckI>
      </label>
      <InpErrI>
        <IfErrI check="r">action is too long ;)</IfErrI>
        <IfErrI check="!e">action is required</IfErrI>
        <DefaultErrI/>
      </InpErrI>
      <InpHintI>
        <p>enter descriptive action up to 17 letters</p>
      </InpHintI>
    </InputBoxI>;
  }
}
