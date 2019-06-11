import { h } from 'preact';
import { Link } from 'preact-router';
import { Container } from 'injection/inject-1k';
import { regBundleCtx } from 'injection/bundle';
import { Instantiable } from 'collection/typed-object';
import { T } from 'i18n/translate-tag';
import { TitleStdMainMenu } from 'app/title-std-main-menu';
import { TransCom, TransComS } from 'i18n/trans-component';
import bulma from 'app/style/my-bulma.sass';

class ChooseSport extends TransCom<{}, TransComS> {
  // @ts-ignore
  private $locStore: LocalStorage;

  constructor(props) {
    super(props);
    this.st = {at: this.at()};
  }

  render() {
    const [TI, TitleStdMainMenuI] = this.c2(T, TitleStdMainMenu);
    return <div>
      <TitleStdMainMenuI t$title="Choose sport"/>

      <ul class={bulma.list}>
        <li class={bulma.listItem}>
          <Link href="/tournament/new/tennis" class={bulma.button + ' ' + bulma.isPrimary}>
            <TI m="Tennis" />
          </Link>
        </li>
        <li class={bulma.listItem}>
          <Link href="/tournament/new/ping-pong" class={bulma.button + ' ' + bulma.isPrimary}>
            <TI m="Ping-Pong" />
          </Link>
        </li>
      </ul>
    </div>;
  }

  at(): string[] { return []; }
}

export default function loadBundle(bundleName: string, mainContainer: Container): Instantiable<ChooseSport> {
  return regBundleCtx(bundleName, mainContainer, ChooseSport, (o) => o);
}
