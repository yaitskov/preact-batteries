import { h } from 'preact';
import { InjSubCom } from 'injection/inject-sub-components';
import { Container } from 'injection/inject-1k';
import { regBundleCtx } from 'injection/bundle';
import { Instantiable } from 'collection/typed-object';

class NewTennisRules extends InjSubCom<{}, {}> {
  render() {
    return <div>new tennis rules stub</div>;
  }
}

export default function loadBundle(bundleName: string, mainContainer: Container): Instantiable<NewTennisRules> {
  return regBundleCtx(bundleName, mainContainer, NewTennisRules, (o) => o);
}
