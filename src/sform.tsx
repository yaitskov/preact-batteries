import { Component, h } from 'preact';
import { Valiform } from './form-validation';

export interface SformP {
  data: Map<string, string>;
  onSend: (d: Map<string, string>) => void;
}

export class Sform extends Component<SformP> {
  $valiform: Valiform;
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.$valiform.setSubmit(this.props.onSend);
  }

  componentDidMount() {
    this.$valiform.setValue(this.props.data);
  }

  render() {
    // @ts-ignore
    return <div>{this.props.children}</div>;
  }
}
