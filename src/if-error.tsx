import { h } from 'preact';
import { MyCo } from 'component/my-component';
import { Valiform } from './form-validation';
import { Invalid } from './invalid';
import { ValiFieldLi } from './input-if';
import { If } from './if';

interface IfErrSt {
  show: boolean;
}

interface IfErrP {
  check: string;
}

// show children if field is invalid
export class IfErr extends MyCo<IfErrP, IfErrSt> implements ValiFieldLi {
  // @ts-ignore TS2564
  $valiform: Valiform;

  constructor(props) {
    super(props);
    this.valid();
  }

  public chkN(): string {
    return this.pr.check;
  }

  wMnt() {
    console.log(`iferr will mount ${this.props.check}`);
    this.$valiform.topForm().addFan(this);
  }

  dMnt() {
    console.log(`iferr did mount ${this.props.check}`);
  }

  valid() {
    this.st = {show: false};
  }

  invalid(inv: Invalid[]) {
    this.st = {show: inv.filter(i => i.check == this.chkN()).length > 0};
  }

  dirty() {
    // nop
  }

  empty() {
    this.valid();
  }

  render() {
    // @ts-ignore
    return <If f={this.st.show}>{this.props.children}</If>;
  }
}
