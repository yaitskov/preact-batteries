import { render, h, Component } from 'preact';
import { Container, inject } from './injection/inject-1k';

import { ToDoForm, ToDoFormP, ToDo } from './todo-form';
import { MyCo } from 'component/my-component';
import { Thenable } from './async/abortable-promise';
import { postJ, geT } from './async/abortable-fetch';
import { Valiform } from 'component/form/validation/form-validation';
import { Validation } from 'component/form/validation/validation';

let container = new Container();

container
  .bind(
    [
      ['valiform', Valiform],
      ['validation', Validation],
    ])
  .sBean('container', container);


const ToDoFormI = inject(ToDoForm, container);


function submitHandler(data: ToDo): Thenable<ToDo> {
  console.log(`sending data ${JSON.stringify(data)}`);
  return postJ('/todo', data).tn(
    (r) => {
      console.log(`sent data ${JSON.stringify(data)}`) ;
      return data;
    }).ctch(
      e => console.log(`ops ${e}`));
}

interface TodoListP {
  todos: ToDo[];
}

class TodoList extends MyCo<TodoListP, {}> {
  render() {
    return <ul>
      { this.props.todos.map(td => <li><b>{td.priority}:</b> {td.action}</li>) }
    </ul>;
  }
}

interface TodoGroupS {
  todoList: ToDo[];
  todo: ToDo;
}

class TodoGroup extends MyCo<{}, TodoGroupS> {
  constructor(props) {
    super(props);
    this.st = {todoList: [],
               todo: {priority: 1, action: 'GO GO GO!'}};
  }

  wMnt() {
    geT('/todos').tn(r => r.json().then(todos => this.ust(state => ({...state, todoList: todos.todos}))));
  }

  render() {
    return <div>
      <h1>Todos</h1>
      <div>
        <TodoList todos={this.st.todoList}/>
      </div>
      <h1>New TODO</h1>
      <ToDoFormI todo={this.st.todo} onSubmit={td => submitHandler(td).tnr(x => this.ust(state => ({...state, todoList: [...state.todoList, {...state.todo}]}))) }/>
        </div>;
  }
}

render(<TodoGroup/>, document.body);
