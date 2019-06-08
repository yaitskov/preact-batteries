import { h } from 'preact';
import { Link, route } from 'preact-router';
import { regBundleCtx } from 'injection/bundle';
import { Container } from 'injection/inject-1k'
import { Tobj, Instantiable } from 'collection/typed-object';
import { TransCom, TransComS } from 'i18n/trans-component';
import { TitleMainMenu } from 'app/component/title-main-menu';
import { NavbarLinkItem } from 'app/component/navbar-link-item';
import { T } from 'i18n/translate-tag';
import { MyCo } from 'component/my-component';
import { SignUpSr } from 'app/auth/sign-up-service';

import bulma from 'bulma/css/bulma.css';

export interface LandingPageS extends TransComS {
}

type TileColor = 'red' | 'yellow' | 'green' | 'blue' | 'turquoise';

interface TileP {
  t$title: string;
  t$body: string;
  color: TileColor;
}

const colors: Tobj<string> = {
  red: bulma['is-danger'],
  yellow: bulma['is-warning'],
  green: bulma['is-success'],
  blue: bulma['is-info'],
  turquoise: bulma['is-primary']
};

class Tile extends MyCo<TileP, {}> {
  render() {
    return <div class={bulma.tile + ' ' + bulma['is-parent']}>
    <article class={bulma.tile + ' ' + bulma['is-child'] + ' ' + bulma.notification + ' ' + colors[this.props.color]}>
      <p class={bulma.title}>
        {this.props.t$title}
      </p>
      <p class={bulma.content}>
        {this.props.t$body}
      </p>
    </article>
    </div>;
  }
}

class TileLine extends MyCo<{}, {}> {
  render() {
    // @ts-ignore
    return <div class={bulma.tile + ' ' + bulma['is-ancestor']}>{this.props.children}</div>;
  }
}

class CS extends MyCo<{}, {}> {
  render() {
    return <span>Cloud-Sport</span>;
  }
}

class Par extends MyCo<{}, {}> {
  render() {
    // @ts-ignore
    return <p class={bulma.content + ' ' + bulma['is-medium']}>{this.props.children}</p>;
  }
}

class SecCon extends MyCo<{}, {}> {
  render() {
    // @ts-ignore
    return <section class={bulma.section}><div class={bulma.container}>{this.props.children}</div></section>;
  }
}

export class LandingPage extends TransCom<{}, LandingPageS> {
  // @ts-ignore
  private $signUp: SignUpSr;

  regAsReferee() {
    this.$signUp.signUpAnonymous().tn(o => route('/new-tournament'));
  }

  constructor(props) {
    super(props);
    this.regAsReferee = this.regAsReferee.bind(this);
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

      <SecCon>
        <h1 class={bulma.title}>What is <CS/>?</h1>
        <Par>
          <CS/> is a modern place for conducting sport tournaments in tennis and ping-pong between amateurs.
        </Par>
        <Par>
          Amateur tournaments have their own specific and <CS/> takes that into account.
          Referees have more freedom and control over a tournament flow,
          e.g. there is no problem to add a participant to a group even all its matches are over.
        </Par>
        <Par>
          In short, the slogan of <CS/> is to allow <strong>change rules as a game goes!</strong>
        </Par>
        <Par>
          If you don't know how many people will take a part in the mid of tournament,
          then <CS/> is exactly for you.
        </Par>
      </SecCon>

      <SecCon>
        <TileLine>
          <Tile t$title="No paper"
                t$body="track a tournament with a phone and save time on printing blanks and rewriting protocols due mistakes"
                color="turquoise" />
          <Tile t$title="No desk"
                t$body="less furniture and more space for games" color="yellow" />
          <Tile t$title="No lines"
                t$body="online registration" color="blue" />
        </TileLine>

        <TileLine>
          <Tile t$title="Enjoy watching"
                t$body="participants submit their own results and referee is out of the loop, but he keeps control and can override match outcome" color="red" />
          <Tile t$title="Facebook integration"
                t$body="publish results in 1 click" color="blue" />
          <Tile t$title="Crowdless"
                t$body="aren't you tired of participants hanging around your desk waiting for their turn and constantly asking boring repetitive questions?! Give them an opportunity to relax in a cafe nearby before the next match starts and don't worry about missing their turn" color="green" />
        </TileLine>
      </SecCon>

      <SecCon>
        <div class={bulma.buttons + ' ' + bulma['is-centered']}>
          <button class={bulma.button + ' ' + bulma['is-primary'] + ' ' + bulma['is-large']}
                  onClick={this.regAsReferee}>
            <TI m="Create tournament"/>
          </button>
          <Link class={bulma.button + ' ' + bulma['is-large']} href="/features">
            <TI m="Detailed feature list"/>
          </Link>
        </div>
      </SecCon>
    </div>;
  }

  at(): string[] { return []; }
}

export default function loadBundle(bundleName: string, mainContainer: Container): Instantiable<LandingPage> {
  return regBundleCtx(name, mainContainer, LandingPage, (o) => o);
}
