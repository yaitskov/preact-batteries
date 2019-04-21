import { h, Component } from 'preact';
import { InjSubCom } from './inject-sub-components';
import { Valiform } from './form-validation';
import { ValiFieldLi } from './input-if';
import { DomCom } from './dom-component';


interface InpErrSt {
  show: boolean;
}

interface InpErrP {
  name: string;
}

// show children if field is invalid
export class InpErr extends InjSubCom<InpErrP, InpErrSt> implements ValiFieldLi {
  $valiform: Valiform;

  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  protected subComTypes(): Type[] {
    return [DomCom];
  }

  wMnt() {
    console.log(`inp err will mount ${this.props.name}`);
    this.$valiform.addFan(this);
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
    const DomC = this.sCom(DomCom);
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
