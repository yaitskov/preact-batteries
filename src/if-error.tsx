import { h } from 'preact';
import { MyCo } from './my-component';
import { Valiform } from './form-validation';
import { Invalid } from './validation';
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
  // @ts-ignore TS2564xb
  $valiform: Valiform;

  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  wMnt() {
    console.log(`iferr will mount ${this.props.check}`);
    this.$valiform.topForm().addFan(this);
  }

  dMnt() {
    console.log(`iferr did mount ${this.props.check}`);
  }

  valid() {
    this.setState({show: false});
  }

  invalid(inv: Invalid[]) {
    this.setState({show: inv.filter(i => i.name == this.props.check).length > 0});
  }

  dirty() {
    // nop
  }

  empty() {
    this.setState({show: false});
  }

  render() {
    // @ts-ignore
    return <If f={this.state.show}>{this.props.children}</If>;
  }
}
