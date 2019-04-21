import { h, Component } from 'preact';
import { MyCo } from './my-component';
import { Valiform } from './form-validation';
import { ValiFieldLi } from './input-if';
import { Container, inject } from './inject-1k';
import { DomCom } from './dom-component';


interface InpErrSt {
  show: boolean;
}

interface InpErrP {
  name: string;
}

// show children if field is invalid
export class InpErr extends MyCo<InpErrP, InpErrSt> implements ValiFieldLi {
  $valiform: Valiform;
  $container: Container;
  domCom: DomCom;

  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  wMnt() {
    console.log(`inp err will mount ${this.props.name}`);
    this.$valiform.addFan(this);
    this.domCom = inject(DomCom, this.$container);
  }

  componentDidMount() {
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
    const DomC = this.domCom;
    console.log(`error render called ${this.state.show}`);
    //if (this.state.show) {
    // @ts-ignore
    return <div style={{ display: this.state.show }} class="errors">
      <DomC name="inpErr">
        {this.props.children}
      </DomC>
    </div>;
  }
}
