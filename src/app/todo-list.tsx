import { h } from 'preact';
import { Container, inject } from 'injection/inject-1k';

import { geT } from 'async/abortable-fetch';

import { MyCo } from 'component/my-component';
import { ToDo } from 'app/todo-form';
import { ObList } from 'collection/observable-list';
import { MainMenu } from 'app/main-menu';
import { T } from 'i18n/translate-tag';

interface TodoListSt {
  todos: ToDo[];
}

export default class TodoList extends MyCo<{}, TodoListSt> {
  // @ts-ignore
  $bundleName: string;
  // @ts-ignore
  $todoList: ObList<ToDo>;
  // @ts-ignore
  $container: Container;

  constructor(props) {
    super(props);
    this.st = {todos: []};
  }

  wMnt() {
    // geT('/todos').tn(r => r.json().then(todos => this.ust(state => ({...state, todoList: todos.todos}))));
    // this.$todoList.length
    this.$todoList.onAdd(td => this.ust(st => ({...st, todos: [...st.todos, td]})));
    geT('/todos').tn(
      r => r.json().then(
        todos => todos.todos.forEach(
          td => this.$todoList.add(td))));
  }

  render() {
    const TI = inject(T, this.$container);
    return <div>
      <MainMenu/>
      <h1><TI m="Todos"/></h1>
      <p>Bundle: {this.$bundleName}</p>
      <ul>
        {this.st.todos.map(td => <li><b>{td.priority}:</b> {td.action}</li>)}
      </ul>
    </div>;
  }
}
