import { Component, h } from 'preact';

export interface TraceComponentProps {
  name: string;
}

export class TraceComponent extends Component<TraceComponentProps> {
  constructor(props) {
    super(props);
    console.log(`construct ${this.props.name}`);
  }

  componentWillMount() {
    console.log(`will mount ${this.props.name}`);
  }

  componentDidMount() {
    console.log(`did mount ${this.props.name}`);
  }

  componentWillReceiveProps(newProps) {
    console.log(`will receive props ${this.props.name}`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(`should update ${this.props.name}`);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(`will update ${this.props.name}`);
  }

  componentWillUnMount() {
    console.log(`will un mount ${this.props.name}`);
  }

  render() {
    // @ts-ignore TS2533
    return this.props.children[0];
  }
}
