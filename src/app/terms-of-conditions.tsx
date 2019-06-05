import { h } from 'preact';
import { MainMenu } from 'app/main-menu';
import { T } from 'i18n/translate-tag';
import { TitleMainMenu } from 'app/component/title-main-menu';
import { NavbarLinkItem } from 'app/component/navbar-link-item';
import { TransCom, TransComS } from 'i18n/trans-component';

import bulma from 'bulma/css/bulma.css';

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
    const [TI, TitleMainMenuI] = this.c2(T, TitleMainMenu);
    return <div>
      <TitleMainMenuI
        t$title="Terms of conditions"
        menuItems={
          [
            <NavbarLinkItem path="/todo-list" t$label="Todos" />,
            <hr class={bulma.navbarDivider}/>,
            <NavbarLinkItem path="/new-todo" t$label="New TODO" />
          ]
        } />
      <MainMenu/>
      <p>No WARRANTY!</p>
      <p>Bundle is: {this.$bundleName}</p>
    </div>;
  }

  at(): string[] { return []; }
}
