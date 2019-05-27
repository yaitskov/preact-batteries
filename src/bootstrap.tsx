import { render, h, Component } from 'preact';
import { Container, inject } from 'injection/inject-1k';

import { Valiform } from 'component/form/validation/form-validation';
import { Validation } from 'component/form/validation/validation';
import { LandingPage } from 'app/landing-page';

import { ToDo } from 'app/todo-form';
import { ObList } from 'collection/observable-list';

const container = new Container();

container
  .bind(
    [
      ['valiform', Valiform],
      ['validation', Validation],
    ])
  .sBean('container', container)
  .sBean('bundleName', 'root')
  .sBean('todoList', new ObList<ToDo>());

const LandingPageI = inject(LandingPage, container);

render(<LandingPageI/>, document.body);
