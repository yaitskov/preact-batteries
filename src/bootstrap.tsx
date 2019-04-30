import { render, h, Component } from 'preact';
import { Container, inject } from './inject-1k';

import { ToDoForm, ToDoFormP, ToDo } from './todo-form';

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
  console.log(`send data ${JSON.stringify(data)}`);
}

let todo: ToDo = {priority: 1, action: 'GO GO GO!'};

render(
  <div>
    <h1>Todos</h1>
    <ToDoFormI todo={todo} onSubmit={td => submitHandler(td)}/>
  </div>, document.body);
