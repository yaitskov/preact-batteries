import { render, h, Component } from 'preact';
import { Container, inject } from 'injection/inject-1k';

import { Valiform } from 'component/form/validation/form-validation';
import { Validation } from 'component/form/validation/validation';
import { LandingPage } from 'app/landing-page';

import { ToDo } from 'app/todo-form';
import { ObList } from 'collection/observable-list';
import { ObVar } from 'collection/observable-variable';
import { I18Trans, LanguageCode } from 'i18n/i18n-translator';

const container = new Container();

container
  .bind(
    [
      ['valiform', Valiform],
      ['validation', Validation],
      ['i18Trans', I18Trans],
    ])
  .sBean('bundlesCtx', {})
  .sBean('bundleName', 'bootstrap')
  .sBean('curLang', new ObVar<LanguageCode>('pl'))
  .sBean('todoList', new ObList<ToDo>());


const LandingPageI = inject(LandingPage, container);

render(<LandingPageI/>, document.body);
