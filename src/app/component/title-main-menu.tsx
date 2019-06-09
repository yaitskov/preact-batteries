import { h } from 'preact';
import { Link } from 'preact-router';
import { InjSubCom } from 'injection/inject-sub-components';
import { T } from 'i18n/translate-tag';
import { SuperElement } from 'component/types';
import { UserAuth } from 'app/auth/user-auth';
import { If } from 'component/if';
import { LogoutBtn } from 'app/component/logout-button';

import bulma from 'bulma/bulma.sass';

export interface TitleMainMenuP {
  t$title: string;
  menuItems: SuperElement[];
}

interface TitleMainMenuS {
  showMenu: boolean;
}

export class TitleMainMenu extends InjSubCom<TitleMainMenuP, TitleMainMenuS> {
  // @ts-ignore
  private $userAuth: UserAuth;

  toggleMenu() {
    this.ust(st => ({...st, showMenu: !st.showMenu}));
  }

  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.st = {showMenu: false};
  }

  render() {
    const [IT, LogoutBtnI] = this.c2(T, LogoutBtn);
    const active = this.st.showMenu ? bulma.isActive : '';
    return <nav class={bulma.navbar} role="navigation" aria-label="main navigation">
      <div class={bulma.navbarBrand}>
        <a class={bulma.navbarItem} href="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>

        <a role="button" class={bulma.navbarBurger} onClick={this.toggleMenu}
           aria-label="menu" aria-expanded="false" data-target="mainMenuAnchor">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="mainMenuAnchor" class={bulma.navbarMenu + ' ' + active}>
        <div class={bulma.navbarStart}>
          <a class={bulma.navbarItem}>
            {this.props.t$title}
          </a>

          <div class={bulma.navbarItem + ' ' + bulma.hasDropdown + ' ' + bulma.isHoverable}>
            <a class={bulma.navbarLink}>
              <IT m="Menu" />
            </a>

            <div class={bulma.navbarDropdown}>
              {this.props.menuItems}
            </div>
          </div>
        </div>

        <div class={bulma.navbarEnd}>
          <div class={bulma.navbarItem}>
            <div class={bulma.buttons}>
              <If f={!this.$userAuth.isAuthenticated()}>
                <Link class={bulma.button + ' ' + bulma.isPrimary} href="/sign-up">
                  <strong>Sign up</strong>
                </Link>
                <Link class={bulma.button + ' ' + bulma.isLight} href="/sign-in">
                  Log in
                </Link>
              </If>
              <If f={this.$userAuth.isAuthenticated()}>
                <LogoutBtnI/>
              </If>
            </div>
          </div>
        </div>
      </div>
    </nav>;
  }
}
