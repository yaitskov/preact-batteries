import { Component, h } from 'preact';

export interface IfSt {
  f: boolean;
}

export class If extends Component<IfSt> {
  render() {
    // @ts-ignore
    return <div style={{ display: this.props.f ? 'block' : 'none' }}>{this.props.children}</div>;
  }
}
