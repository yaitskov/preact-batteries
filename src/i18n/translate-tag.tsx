import { h } from 'preact';
import { MyCo } from 'component/my-component';

import { I18Trans } from 'i18n/i18n-translator';

export interface TP {
  m: string;
}

export interface TS {
  msg: string;
}

export class T extends MyCo<TP, TS> {
  // @ts-ignore
  private $i18Trans: I18Trans;

  constructor(props) {
    super(props);
    this.st = {msg: this.props.m};
  }

  wMnt() {
    this.u(this.props.m);
  }

  u(m: string) {
    this.ust(s => ({msg: m}));
    this.$i18Trans.map(m).tn(transMsg => this.ust(s => ({msg: transMsg})));
  }

  onUp(prevProps: TP) {
    const m = this.props.m;
    if (m != prevProps.m) {
      this.u(m);
    }
  }

  render() {
    return <span data-text-id={this.props.m}>{this.st.msg}</span>;
  }
}
