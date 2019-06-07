import { h } from 'preact';
import { TransCom, TransComS } from 'i18n/trans-component';
import { TitleMainMenu } from 'app/component/title-main-menu';
import { NavbarLinkItem } from 'app/component/navbar-link-item';
import { T } from 'i18n/translate-tag';

import bulma from 'bulma/css/bulma.css';

export interface LandingPageS extends TransComS {
}

export default class LandingPage extends TransCom<{}, LandingPageS> {
  constructor(props) {
    super(props);
    this.st = {at: this.at()};
  }

  render() {
    const [TI, TitleMainMenuI] = this.c2(T, TitleMainMenu);
    return <div>
      <TitleMainMenuI
        t$title="Welcome to Cloud-Sport"
        menuItems={
          [
            <NavbarLinkItem path="/draft" t$label="Draft to coming tournaments" />,
            <NavbarLinkItem path="/watch" t$label="Watch ongoing tournaments" />,
            <hr class={bulma.navbarDivider}/>,
            <NavbarLinkItem path="/terms" t$label="Terms of service" />
          ]
        } />
      <section class={bulma.section}>
        <div class={bulma.container}>
          <div class={bulma.tile}>
            <article class={bulma.tile}>
              <p class={bulma.title}>
                <TI m="No paper work!" />
              </p>
              <p class={bulma.subtitle}>
              </p>
            </article>
          </div>

          <div class={bulma.tile}>
            <article class={bulma.tile}>
              <p class={bulma.title}>
                <TI m="No long lines and jams!"/>
              </p>
              <p class={bulma.subtitle}>
              </p>
            </article>
          </div>

          <div class={bulma.tile}>
            <article class={bulma.tile}>
              <p class={bulma.title}>
                <TI m="Referee enjoy watching not a book keeping!"/>
              </p>
              <p class={bulma.subtitle}>
              </p>
            </article>
          </div>

          <div class={bulma.tile}>
            <article class={bulma.tile}>
              <p class={bulma.title}>
                <TI m="Share tournament outcome on Facebook in one click!" />
              </p>
              <p class={bulma.subtitle}>
              </p>
            </article>
          </div>

          <div class={bulma.tile}>
            <article class={bulma.tile}>
              <p class={bulma.title}>
                <TI m="Don't worry about your turns and relax in a cafe!" />
              </p>
              <p class={bulma.subtitle}>
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>;
  }

  at(): string[] { return []; }
}
