import { h, Component } from 'preact';
import { Valiform } from './form-validation';
import { ValiFieldLi } from './input-if';

interface IfErrSt {
  show: boolean;
}

interface IfErrP {
  check: string;
}

// show children if field is invalid
export class IfErr extends Component<IfErrP, IfErrSt> implements ValiFieldLi {
  $valiform: Valiform;

  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  componentWillMount() {
    console.log(`iferr will mount ${this.props.check}`);
    this.$valiform.addFan(this);
  }

  componentDidMount() {
    console.log(`iferr did mount ${this.props.check}`);
  }

  valid() {
    this.setState({show: false});
  }

  invalid(inv: Invalid[]) {
    this.setState({show: inv.filter(i => i.checkerName == this.props.check).length as boolean});
  }

  dirty() {
    // nop
  }

  empty() {
    this.setState({show: false});
  }

  render() {
    if (this.state.show) {
      // @ts-ignore
      return this.props.children[0];
    }
    return null;
  }
}
