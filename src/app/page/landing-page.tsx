import { h } from 'preact';
import { InjSubCom } from 'injection/inject-sub-components';

import bulma from 'bulma/css/bulma.css';

export default class LandingPage extends InjSubCom<{}, {}> {
  render() {
    return <section class={bulma.section}>
      <div class={bulma.container}>
        <div class={bulma.tile}>
          <article class={bulma.tile}>
            <p class={bulma.title}>
              No paper work!
            </p>
            <p class={bulma.subtitle}>
            </p>
          </article>
        </div>

        <div class={bulma.tile}>
          <article class={bulma.tile}>
            <p class={bulma.title}>
              No long lines and jams!
            </p>
            <p class={bulma.subtitle}>
            </p>
          </article>
        </div>

        <div class={bulma.tile}>
          <article class={bulma.tile}>
            <p class={bulma.title}>
              Referee enjoy watching not a book keeping!
            </p>
            <p class={bulma.subtitle}>
            </p>
          </article>
        </div>

        <div class={bulma.tile}>
          <article class={bulma.tile}>
            <p class={bulma.title}>
              Share tournament outcome on Facebook in one click!
            </p>
            <p class={bulma.subtitle}>
            </p>
          </article>
        </div>

        <div class={bulma.tile}>
          <article class={bulma.tile}>
            <p class={bulma.title}>
              Don't worry about your turns and relax in a cafe!
            </p>
            <p class={bulma.subtitle}>
            </p>
          </article>
        </div>
      </div>
    </section>;
  }
}
