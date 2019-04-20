import { Component, h } from 'preact';
import { Valiform } from './form-validation';

export interface SubmitP {
  text: string;
}

export class Submit extends Component<SubmitP> {
  // @ts-ignore
  $valiform: Valiform;

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.$valiform.onSubmit(e);
  }

  render() {
    return <input type="submit" value={this.props.text} onClick={this.onClick} />;
  }
}
