import { Component, h } from 'preact';

export class MyCo<P, S> extends Component<P, S> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.wMnt();
  }

  protected wMnt(): void {
    console.log("default wMnt");
  }
}
