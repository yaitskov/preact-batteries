import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { InjSubCom } from 'injection/inject-sub-components';
import { T } from 'i18n/translate-tag';
import bulma from 'bulma/css/bulma.css';
import { SuperElement } from 'component/types';
import { UserAuth } from 'app/auth/user-auth';
import { If } from 'component/if';
import { LogoutBtn } from 'app/component/logout-button';

export interface TitleMainMenuP {
  t$title: string;
  menuItems: SuperElement[];
}

interface TitleMainMenuS {
}

export class TitleMainMenu extends InjSubCom<TitleMainMenuP, TitleMainMenuS> {
  // @ts-ignore
  private $userAuth: UserAuth;

  render() {
    const [IT, LogoutBtnI] = this.c2(T, LogoutBtn);
    return <nav class={bulma.navbar} role="navigation" aria-label="main navigation">
      <div class={bulma.navbarBrand}>
        <a class={bulma.navbarItem} href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>

        <a role="button" class={bulma.navbarBurger}
           aria-label="menu" aria-expanded="false" data-target="mainMenuAnchor">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="mainMenuAnchor" class={bulma.navbarMenu + ' ' + bulma.isActive}>
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
