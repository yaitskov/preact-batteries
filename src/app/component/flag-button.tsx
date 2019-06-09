import { h } from 'preact';
import { Link } from 'preact-router';
import { MyCo } from 'component/my-component';
import { LanguageCode } from 'i18n/i18n-translator';

import bulma from 'app/style/my-bulma.sass';
import flagIcon from 'flag-icon-css/css/flag-icon.css';


export interface FlagBtnP {
  href: string;
  flag: LanguageCode;
  css?: string;
}

export class FlagBtn extends MyCo<FlagBtnP, {}> {
  render() {
    return <Link class={bulma.button + ' ' + this.props.css} href={this.props.href}>
      <span class={flagIcon.flagIcon + ' ' + flagIcon[`flag-icon-${this.props.flag}`]}/>
    </Link>;
  }
}
