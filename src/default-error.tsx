import { h } from 'preact';
import { U } from './const';
import { Valiform, MetaInput } from './form-validation';
import { Tobj, mapO, emptyM, aHas, toMap } from './collection/typed-object';
import { Invalid } from './invalid';
import { ValiFieldLi } from './input-if';
import { MyCo } from 'component/my-component';
import { If } from './if';

interface St {
  errs: Tobj<string>;
}

export class DefaultErr extends MyCo<{},  St> implements ValiFieldLi {
  // @ts-ignore TS2564
  $valiform: Valiform;
  // @ts-ignore TS2564
  meta: MetaInput;

  constructor(props) {
    super(props);
    this.valid();
  }

  public chkN(): string {
    return U;
  }

  wMnt() {
    const form = this.$valiform.topForm();
    form.addFan(this);
    this.meta = form.curMField();
  }

  valid() {
    this.st = {errs: {}};
  }

  invalid(inv: Invalid[]) {
    const shownChecks = this.meta.shownChecks();
    this.st = {errs: toMap(inv.filter(i => aHas(i.check, shownChecks)), i => i.check, i => i.msgTmp) };
  }

  dirty() {
    // nop
  }

  empty() {
    this.valid();
  }

  render() {
    // @ts-ignore
    return <If f={!emptyM(this.st.errs)}>
      {mapO(this.st.errs, ([k, m]) => <div class={"err-" + k}>{m}</div>)}
    </If>;
  }
}
