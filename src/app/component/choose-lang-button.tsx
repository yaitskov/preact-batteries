import { h } from 'preact';
import { LanguageCode } from 'i18n/i18n-translator';
import { FlagBtn } from 'app/component/flag-button';
import { ObVar } from 'collection/observable-variable';
import { MyCo } from 'component/my-component';

export interface ChooseLangBtnP {
  css?: string;
}

export class ChooseLangBtn extends MyCo<ChooseLangBtnP, {}> {
  // @ts-ignore
  private $curLang: ObVar<LanguageCode>;

  wMnt() {
    this.$curLang.onSet(lang => this.forceUpdate());
  }

  render() {
    return <FlagBtn href="/lang" css={this.props.css} flag={this.$curLang.val} />;
  }
}
