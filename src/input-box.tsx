import { Component, h } from 'preact';
import { Valiform } from 'form-validation';

/**
  draw scope for input listeners
*/
export class InputBox extends Component {
  // @ts-ignore
  $valiform: Valiform;

  componentWillMount() {
    this.$valiform.flushListeners();
    this.$valiform.noListeners();
  }

  componentDidMount() {
  }

  render() {
    // @ts-ignore
    return <div>{this.props.children}</div>; //[0];
  }
}
