import { h } from 'preact';
import { InjSubCom } from 'injection/inject-sub-components';
import { MainMenu } from 'app/main-menu';
import { T } from 'i18n/translate-tag';
import { TitleMainMenu } from 'app/component/title-main-menu';
import { NavbarLinkItem } from 'app/component/navbar-link-item';
import { I18Trans } from 'i18n/i18n-translator';

import bulma from 'bulma/css/bulma.css';

export interface TermsS {
  at: string[];
}

export class Terms extends InjSubCom<{}, TermsS> {
  // @ts-ignore
  $bundleName: string;
  // @ts-ignore
  private $i18Trans: I18Trans;

  constructor(props) {
    super(props);
    this.st = {at: this.at()};
  }

  wMnt() {
    this.$i18Trans.bulkMap(this.st.at).tn(t => this.ust(st => ({...st, at: t})));
  }

  render() {
    const [TI, TitleMainMenuI] = this.c2(T, TitleMainMenu);
    return <div>
      <TitleMainMenuI
        title="Terms of conditions"
        menuItems={
          [
            <NavbarLinkItem path="/todo-list" t$label="Todos" />,
            <hr class={bulma.navbarDivider}/>,
            <NavbarLinkItem path="/new-todo" t$label="New TODO" />
          ]
        } />
      <MainMenu/>
      <h1><TI m="Terms of conditions" name="Daniil" /></h1>
      <p>No WARRANTY!</p>
      <p>Bundle is: {this.$bundleName}</p>
    </div>;
  }

  at(): string[] { return []; }
}
