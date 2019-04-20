import { Component, h } from 'preact';
import { Valiform } from './form-validation';
import { InputOkP, InputIf } from './input-if';
import { Invalid } from './validation';

export class InputOk extends Component<InputOkP> implements InputIf {
  // @ts-ignore
  $valiform: Valiform;

  constructor(props) {
    super(props);
    this.state = {val: ''};
    this.onChng = this.onChng.bind(this);
  }

  componentWillMount() {
    this.$valiform.add(this);
  }

  componentWillUnmount() {
    this.$valiform.rm(this);
  }

  onChng(e) {
    e.preventDefault();
    this.$valiform.change(this, this.state.val, e.target.value);
    this.setState({val: e.target.value});
  }

  render(p, st) {
    return <input value={st.val} onChange={this.onChng} />;
  }

  updateVal(v: string) {
    this.$valiform.change(this, null, v);
    this.setState({val: v});
  }

  empty() {
  }

  valid() {
  }

  dirty() {
  }

  invalid(er: Invalid[]) {
  }
}
