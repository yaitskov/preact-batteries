import { render, h, Component } from 'preact';
import { Container, inject } from './inject-1k';

import { ToDoForm, ToDoFormP, ToDo } from './todo-form';
import { MyCo } from './my-component';
import { Thenable } from './abortable-promise';
import { postJ, geT } from './abortable-fetch';
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
    this.setState({todoList: [],
                   todo: {priority: 1, action: 'GO GO GO!'}});
  }

  wMnt() {
    geT('/todos').tn(r => r.json().then(todos => this.ust(state => ({...state, todoList: todos.todos}))));
  }

  render() {
    return <div>
      <h1>Todos</h1>
      <div>
        <TodoList todos={this.state.todoList}/>
      </div>
      <h1>New TODO</h1>
      <ToDoFormI todo={this.state.todo} onSubmit={td => submitHandler(td).tnr(x => this.setState({...this.state, todoList: [...this.state.todoList, {...this.state.todo}]})) }/>
        </div>;
  }
}

render(<TodoGroup/>, document.body);
