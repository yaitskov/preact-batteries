import { Component, h } from 'preact';
import linkState from 'linkstate';

interface NameFormProps {
  value: string;
}

export class NameForm extends Component<NameFormProps, NameFormProps> {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(`name ${this.state.value} was submitted`);
    e.preventDefault();
  }

  render(p, state) {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={state.value} onInput={linkState(this, 'value')} />
        </label>
        <input type="submit" value="Submit" />
      </form>);
  }
}
