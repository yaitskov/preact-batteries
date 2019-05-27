import { h } from 'preact';
import { MyCo } from 'component/my-component';
import { MainMenu } from 'app/main-menu';

export class Terms extends MyCo<{}, {}> {
  // @ts-ignore
  $bundleName: string;

  render() {
    return <div>
      <MainMenu/>
      <p>No WARRANTY!</p>
      <p>Bundle is: {this.$bundleName}</p>
    </div>;
  }
}
