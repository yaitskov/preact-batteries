import { h } from 'preact';
import { T } from 'i18n/translate-tag';
// import { route } from 'preact-router';
import { postJ } from 'async/abortable-fetch';
import { Thenable } from 'async/abortable-promise';
import { SignUpForm, UserRegReq } from 'app/page/sign-up/sign-up-form';
import { TitleMainMenu } from 'app/component/title-main-menu';
import { TransCom, TransComS } from 'i18n/trans-component';
import { CommonUtil } from 'app/common-util';
import { I18Trans } from 'i18n/i18n-translator';

interface SignUpP {
}

interface SignUpS extends TransComS {
  regReq: UserRegReq;
}

export default class SignUp extends TransCom<SignUpP, SignUpS> {
  // @ts-ignore
  private $userAuth: UserAuth;
  // @ts-ignore
  private $cutil: CommonUtil;

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

  // private $requestStatus: RequestStatus;

  submitHandler(regReq: UserRegReq): Thenable<Response> {
    console.log(`sending data ${JSON.stringify(regReq)}`);
    return postJ('/do/sign-up',
                 {
                   name: regReq.fullName,
                   phone: regReq.phone,
                   email: regReq.email,
                   sessionPart: this.$cutil.genUserSessionPart()
                 })
      .tnr(r => r.json()
                 .then(
                   (r) => {
                     // this.$requestStatus.complete(r);
                     this.$userAuth.storeSession(r.session, r.uid, regReq.fullName, regReq.email, r.type);
                     console.log(`sent sign up data ${JSON.stringify(regReq)}`) ;
                     return regReq;
                   }))
      .ctch(e => console.log(`ops ${e}`));
  }

  render() {
    const [TI, SignUpFormI, TitleMainMenuI]  = this.c3(T, SignUpForm, TitleMainMenu);
    return <div>
      <TitleMainMenuI t$title="Sign-Up" menuItems={[]} />
      <SignUpFormI regReq={this.st.regReq}
                   onSubmit={rr => this.submitHandler(rr)}/>
    </div>;
  }

  at(): string[] { return []; }
}
