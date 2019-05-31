import { h } from 'preact';
import { InjSubCom } from 'injection/inject-sub-components';
//import bulma from 'app/bulma.css';
//import css from '../todo-list.css';
import bulma from 'bulma/css/bulma.css';

export interface TitleMainMenuP {
  title: string;
}

interface TitleMainMenuS {
}

export class TitleMainMenu extends InjSubCom<TitleMainMenuP, TitleMainMenuS> {
  render() {
    return <nav class={bulma.navbar} role="navigation" aria-label="main navigation">
      <div class={bulma.navbarBrand}>
        <a class={bulma.navbarItem} href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>

        <a role="button" class={bulma.navbarBurger}
           aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class={bulma.navbarMenu + ' ' + bulma.isActive}>
        <div class={bulma.navbarStart}>
          <a class={bulma.navbarItem}>
            {this.props.title}
          </a>

          <div class={bulma.navbarItem + ' ' + bulma.hasDropdown + ' ' + bulma.isHoverable}>
            <a class={bulma.navbarLink}>
              More
            </a>

            <div class={bulma.navbarDropdown}>
              <a class={bulma.navbarItem}>
                Drafting
              </a>
              <a class={bulma.navbarItem}>
                Watch Games
              </a>
              <a class={bulma.navbarItem}>
                Participation
              </a>
              <hr class={bulma.navbarDivider}/>
              <a class={bulma.navbarItem}>
                My judgement
              </a>
            </div>
          </div>
        </div>

        <div class={bulma.navbarEnd}>
          <div class={bulma.navbarItem}>
            <div class={bulma.buttons}>
              <a class={bulma.button + ' ' + bulma.isPrimary}>
                <strong>Sign up</strong>
              </a>
              <a class={bulma.button + ' ' + bulma.isLight}>
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>;
  }
}
