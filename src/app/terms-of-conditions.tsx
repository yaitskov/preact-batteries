import { h } from 'preact';
import { InjSubCom } from 'injection/inject-sub-components';
import { MainMenu } from 'app/main-menu';
import { T } from 'i18n/translate-tag';


export class Terms extends InjSubCom<{}, {}> {
  // @ts-ignore
  $bundleName: string;

  render() {
    const TI = this.c(T);
    return <div>
      <MainMenu/>
      <h1><TI m="Terms of conditions" name="Daniil" /></h1>
      <p>No WARRANTY!</p>
      <p>Bundle is: {this.$bundleName}</p>
    </div>;
  }
}
