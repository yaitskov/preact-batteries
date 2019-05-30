import { h } from 'preact';
import { MyCo } from 'component/my-component';
import { MainMenu } from 'app/main-menu';
import { T } from 'i18n/translate-tag';
import { inject, Container } from 'injection/inject-1k';

export class Terms extends MyCo<{}, {}> {
  // @ts-ignore
  $bundleName: string;

  // @ts-ignore
  $container: Container;

  render() {
    const TI = inject(T, this.$container);

    return <div>
      <MainMenu/>
      <h1><TI m="Terms of conditions" name="Daniil" /></h1>
      <p>No WARRANTY!</p>
      <p>Bundle is: {this.$bundleName}</p>
    </div>;
  }
}
