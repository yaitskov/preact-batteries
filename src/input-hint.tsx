import { h } from 'preact';
import { MyCo } from './my-component';
import { Valiform } from './form-validation';
import { ValiFieldLi } from './input-if';
import { If } from './if';

interface InpHintSt {
  show: boolean;
}

// show children if field is invalid
export class InpHint extends MyCo<{}, InpHintSt> implements ValiFieldLi {
  $valiform: Valiform;

  constructor(props) {
    super(props);
    this.state = {show: true};
  }

  wMnt() {
    console.log('hint will mount');
    this.$valiform.topForm().addFan(this);
  }

  dMnt() {
    console.log('hint did mount');
  }

  valid() {
    this.setState({show: false});
  }

  invalid(inv: Invalid[]) {
    this.setState({show: true});
  }

  dirty() {
    // nop
  }

  empty() {
    this.setState({show: true});
  }

  render() {
    // @ts-ignore
    return <If f={this.state.show}>{this.props.children}</If>;
  }
}