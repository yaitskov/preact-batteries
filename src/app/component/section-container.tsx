import { h } from 'preact';
import { MyCo } from 'component/my-component';

import bulma from 'app/style/my-bulma.sass';

interface SecConP {
  css?: string;
}

export class SecCon extends MyCo<SecConP, {}> {
  render() {
    // @ts-ignore
    return <section class={bulma.section + ' ' + this.props.css}><div class={bulma.container}>{this.props.children}</div></section>;
  }
}
