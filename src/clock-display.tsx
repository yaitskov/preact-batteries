import { Component, h } from 'preact';

export class ClockDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div> {this.props.hours} : {this.props.minutes} : {this.props.seconds}</div>;
  }
}
