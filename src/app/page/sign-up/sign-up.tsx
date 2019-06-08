import { h } from 'preact';
import { T } from 'i18n/translate-tag';
import { Thenable } from 'async/abortable-promise';
import { SignUpForm, UserRegReq } from 'app/page/sign-up/sign-up-form';
import { TitleMainMenu } from 'app/component/title-main-menu';
import { TransCom, TransComS } from 'i18n/trans-component';

import bulma from 'bulma/css/bulma.css';

interface SignUpP {
}

interface SignUpS extends TransComS {
  regReq: UserRegReq;
}

export default class SignUp extends TransCom<SignUpP, SignUpS> {
  // @ts-ignore
  private $signUp: SignUpSr;

  constructor(props) {
    super(props);
    this.st = {
      regReq: {
        fullName: '',
        phone: '',
        email: ''
      },
      at: this.at()
    };
  }

  submitHandler(regReq: UserRegReq): Thenable<Response> {
    return this.$signUp.signUp(regReq).tnr(o => window.history.go(-1));
  }

  render() {
    const [TI, SignUpFormI, TitleMainMenuI]  = this.c3(T, SignUpForm, TitleMainMenu);
    return <section class="section">
      <div class={bulma.container}>
        <TitleMainMenuI t$title="Sign-Up" menuItems={[]} />
        <SignUpFormI regReq={this.st.regReq}
                   onSubmit={rr => this.submitHandler(rr)}/>
      </div>
    </section>;
  }

  at(): string[] { return []; }
}
