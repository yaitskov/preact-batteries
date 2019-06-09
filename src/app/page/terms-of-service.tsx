import { h } from 'preact';
import { T } from 'i18n/translate-tag';
import { Container } from 'injection/inject-1k'
import { Instantiable } from 'collection/typed-object';
import { regBundleCtx } from 'injection/bundle';
import { TitleStdMainMenu } from 'app/title-std-main-menu';
import { TransCom, TransComS } from 'i18n/trans-component';

import bulma from 'bulma/bulma.sass';

export interface TermsS extends TransComS {
}

export class Terms extends TransCom<{}, TermsS> {
  // @ts-ignore
  $bundleName: string;

  constructor(props) {
    super(props);
    this.st = {at: this.at()};
  }

  render() {
    const [TI, TitleStdMainMenuI] = this.c2(T, TitleStdMainMenu);
    return <div>
      <TitleStdMainMenuI t$title="Terms of service"/>
      <p>No WARRANTY!</p>
      <p>Bundle is: {this.$bundleName}</p>
    </div>;
  }

  at(): string[] { return []; }
}

export default function loadBundle(bundleName: string, mainContainer: Container): Instantiable<Terms> {
  return regBundleCtx(name, mainContainer, Terms, (o) => o);
}
