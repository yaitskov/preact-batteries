import { h, Component } from 'preact';
import { Valiform } from './form-validation';
import { ValiFieldLi } from './input-if';

interface InpHintSt {
  show: boolean;
}

// show children if field is invalid
export class InpHint extends Component<{}, InpHintSt> implements ValiFieldLi {
  $valiform: Valiform;

  constructor(props) {
    super(props);
    this.state = {show: true};
  }

  componentWillMount() {
    console.log('hint will mount');
    this.$valiform.addFan(this);
  }

  componentDidMount() {
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
    if (this.state.show) {
      // @ts-ignore
      return <div>{this.props.children}</div>;
    }
    return null;
  }
}
