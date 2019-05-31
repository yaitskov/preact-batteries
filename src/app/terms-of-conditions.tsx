import { h } from 'preact';
import { InjSubCom } from 'injection/inject-sub-components';
import { MainMenu } from 'app/main-menu';
import { T } from 'i18n/translate-tag';
import { TitleMainMenu } from 'app/component/title-main-menu';
import { NavbarLinkItem } from 'app/component/navbar-link-item';
import bulma from 'bulma/css/bulma.css';

export class Terms extends InjSubCom<{}, {}> {
  // @ts-ignore
  $bundleName: string;

  render() {
    const [TI, TitleMainMenuI] = this.c2(T, TitleMainMenu);
    return <div>
      <TitleMainMenuI
        title="Terms of conditions"
        menuItems={
          [
            <NavbarLinkItem path="/todo-list" label="Todo list" />,
            <hr class={bulma.navbarDivider}/>,
            <NavbarLinkItem path="/new-todo" label="New Todo" />
          ]
        } />
      <MainMenu/>
      <h1><TI m="Terms of conditions" name="Daniil" /></h1>
      <p>No WARRANTY!</p>
      <p>Bundle is: {this.$bundleName}</p>
    </div>;
  }
}
