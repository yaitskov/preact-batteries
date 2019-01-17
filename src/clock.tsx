import { Component, h } from 'preact';


export class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { time: props.time };
    this._update = this._updateTime.bind(this);

  }

  render() {
    const time = this._formatTime(this.state.time);
    return <div> { time.hours } : { time.minutes } : { time.seconds } </div>;
  }

  componentDidMount() {
    this._interval = setInterval(this._update, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  _formatTime(time) {
    let [ hours, minutes, seconds ] = [
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()].map(n => n < 10 ? '0' + n : '' + n);
    return {hours, minutes, seconds};
  }

  _updateTime() {
    this.setState({ time: new Date(this.state.time.getTime() + 1000) });
  }

}
