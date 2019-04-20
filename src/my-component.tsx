import { Component, h } from 'preact';

export class MyCo<P, S> extends Component<P, S> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.wMnt();
  }

  wMnt() {
    console.log("default wMnt");
  }
}
