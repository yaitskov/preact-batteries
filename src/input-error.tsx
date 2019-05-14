import { h } from 'preact';
import { U } from './const';
import { Container, inject } from './inject-1k';
import { Valiform } from './form-validation';
import { Invalid } from './invalid';
import { ValiFieldLi } from './input-if';
import { MyCo } from './my-component';
import { If } from './if';


interface InpErrSt {
  show: boolean;
}

interface InpErrP {
  name: string;
}

// show children if field is invalid
export class InpErr extends MyCo<InpErrP, InpErrSt> implements ValiFieldLi {
  // @ts-ignore TS2564
  $valiform: Valiform;
  // @ts-ignore TS2564
  $container: Container;

  constructor(props) {
    super(props);
    this.st = {show: false};
  }

  chkN(): string {
    return U;
  }

  wMnt() {
    console.log(`inp err will mount ${this.props.name}`);
    this.$valiform.topForm().addFan(this);
  }

  dMnt() {
    console.log('err did mount');
  }

  valid() {
    console.log(`valid => false`);
    this.st = {show: false};
  }

  invalid(inv: Invalid[]) {
    console.log(`invalid => true`);
    this.st = {show: true};
  }

  dirty() {
    // nop
  }

  empty() {
    console.log(`empty => false`);
    this.st = {show: false};
  }

  render() {
    // @ts-ignore
    return <If f={this.st.show} class="errors">
      { this.props.children as any }
    </If>;
  }
}
