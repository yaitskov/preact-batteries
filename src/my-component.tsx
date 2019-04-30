import { Component, h } from 'preact';

export abstract class MyCo<P, S> extends Component<P, S> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.wMnt();
  }

  componentWillUnmount() {
    this.wUmt();
  }

  componentDidMount() {
    this.dMnt();
  }

  protected wMnt(): void {
    console.log("default wMnt");
  }

  protected wUmt(): void {
    console.log("default wUmt");
  }

  protected dMnt(): void {
    console.log("default dMnt");
  }
}
