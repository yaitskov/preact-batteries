import { Component, h } from 'preact';
import { ClockDisplay } from './clock-display';

export class ClockTimer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: props.time };
    this._update = this._updateTime.bind(this);
  }

  _updateTime() {
    this.setState({ time: new Date(this.state.time.getTime() + 1000) });
  }

  componentDidMount() {
    this._interval = setInterval(this._update, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    return <ClockDisplay {... this._extract(this.state.time)} />;
  }

  _extract(time) {
    const [hours, minutes, seconds] = [
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()].map(n => n < 10 ? `0${n}` : `${n}`);

    return { hours, minutes, seconds };
  }
}
