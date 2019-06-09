import { h } from 'preact';
import { Link } from 'preact-router';
import { InjSubCom } from 'injection/inject-sub-components';
import { T } from 'i18n/translate-tag';
import { ChooseLangBtn } from 'app/component/choose-lang-button';

import bulma from 'app/style/my-bulma.sass';

export class Footer extends InjSubCom<{}, {}> {
  render() {
    const [TI, ChooseLangBtnI] = this.c2(T, ChooseLangBtn);

    return <footer class={bulma.footer}>
      <div class={bulma.content + ' ' + bulma.hasTextCentered}>
        <div class={bulma.columns}>
          <div class={bulma.column}>
            <p>
              <Link href="/terms">
                <TI m="Terms of service"/>
              </Link>
            </p>
          </div>
          <div class={bulma.column}>
            <p>
              <Link href="/privacy">
                <TI m="Privacy policy" />
              </Link>
            </p>
          </div>
          <div class={bulma.column}>
            <p>
              <a href="https://github.com/yaitskov/ping-pong/issues">
                <TI m="Support" />
              </a>
            </p>
          </div>
          <div class={bulma.column}>
            <p>
              <ChooseLangBtnI css="">
          &nbsp;&nbsp;<TI m="Language" />
              </ChooseLangBtnI>
            </p>
          </div>
        </div>
      </div>
    </footer>;
  }
}
