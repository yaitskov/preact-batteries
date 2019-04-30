import { h } from 'preact';
import { Valiform } from './form-validation';
import { Invalid } from './validation';
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

  constructor(props) {
    super(props);
    this.state = {show: false};
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
    this.setState({show: false});
  }

  invalid(inv: Invalid[]) {
    console.log(`invalid => true`);
    this.setState({show: true});
  }

  dirty() {
    // nop
  }

  empty() {
    console.log(`empty => false`);
    this.setState({show: false});
  }

  render() {
    console.log(`error render called ${this.state.show}`);
    // @ts-ignore
    return <If f={this.state.show} class="errors">
      {this.props.children}
    </If>;
  }
}
