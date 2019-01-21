import { Component, h } from 'preact';

interface NameFormProps {
  value: string;
}

export class NameForm extends Component<NameFormProps, NameFormProps> {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    console.log(`name ${this.state.value} was submitted`);
    e.preventDefault();
  }

  handleChange(e) {
    console.log(`update value [${this.state.value}] => [${e.target.value}]`);
      this.setState({ value: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>);
  }
}
