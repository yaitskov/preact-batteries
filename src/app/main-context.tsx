import { Valiform } from 'component/form/validation/form-validation';
import { Validation } from 'component/form/validation/validation';
import { ToDo } from 'app/todo-form';
import { ObList } from 'collection/observable-list';
import { ObVar } from 'collection/observable-variable';
import { I18Trans, LanguageCode } from 'i18n/i18n-translator';
import { UserAuth } from 'app/auth/user-auth';
import { LocalStorage } from 'app/persistence/local-storage';
import { CommonUtil } from 'app/common-util';
import { Container, inject } from 'injection/inject-1k';


export const container = new Container();

container
  .bind(
    [
      ['cutil', CommonUtil],
      ['locStore', LocalStorage],
      ['userAuth', UserAuth],
      ['valiform', Valiform],
      ['validation', Validation],
      ['i18Trans', I18Trans],
    ])
  .sBean('bundlesCtx', {})
  .sBean('bundleName', 'bootstrap')
  .sBean('curLang', new ObVar<LanguageCode>('pl'))
  .sBean('todoList', new ObList<ToDo>());
