import { render, h, Component } from 'preact';
import { Container, inject } from './inject-1k';

import { ToDoForm, ToDoFormP, ToDo } from './todo-form';
import { Thenable } from './abortable-promise';
import { postJ } from './abortable-fetch';
import { Valiform } from './form-validation';
import { Validation } from './validation';

let container = new Container();

container
  .bind(
    [
      ['valiform', Valiform],
      ['validation', Validation],
    ])
  .sBean('container', container);


const ToDoFormI = inject(ToDoForm, container);

function submitHandler(data) {
  console.log(`sending data ${JSON.stringify(data)}`);
  postJ('/todo', data).tnr(
    (r) => { console.log(`sent data ${JSON.stringify(data)}`) ; }).ctch(
      e => console.log(`ops ${e}`));
}

let todo: ToDo = {priority: 1, action: 'GO GO GO!'};

render(
  <div>
    <h1>Todos</h1>
    <ToDoFormI todo={todo} onSubmit={td => submitHandler(td)}/>
  </div>, document.body);
