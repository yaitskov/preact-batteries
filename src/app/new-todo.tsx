import { h } from 'preact';
import { postJ } from 'async/abortable-fetch';
import { Thenable } from 'async/abortable-promise';

import { inject, Container } from 'injection/inject-1k';
import { MainMenu } from 'app/main-menu';
import { ToDoForm, ToDoFormP, ToDo } from 'app/todo-form';
import { MyCo } from 'component/my-component';

import { ObList } from 'collection/observable-list';


function submitHandler(data: ToDo): Thenable<ToDo> {
  console.log(`sending data ${JSON.stringify(data)}`);
  return postJ('/todo', data).tn(
    (r) => {
      console.log(`sent data ${JSON.stringify(data)}`) ;
      return data;
    }).ctch(
      e => console.log(`ops ${e}`));
}


interface TodoGroupS {
  todo: ToDo;
}

export default class TodoGroup extends MyCo<{}, TodoGroupS> {
  // @ts-ignore
  $bundleName: string;
  // @ts-ignore
  $todoList: ObList<ToDo>;
  // @ts-ignore
  $container: Container;

  constructor(props) {
    super(props);
    this.st = {todo: {priority: 1, action: 'GO GO GO!'}};
  }

  render() {
    const ToDoFormI = inject(ToDoForm, this.$container);
    return <div>
      <MainMenu/>
      <h1>New TODO: {this.$bundleName}</h1>
      <ToDoFormI todo={this.st.todo}
                 onSubmit={td => submitHandler(td).tnr(t => this.$todoList.add(t))}/>
    </div>;
  }
}
