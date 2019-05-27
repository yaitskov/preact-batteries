import { h, Component } from 'preact';
import { Router, Route, route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { inject, FwdContainer, Container } from 'injection/inject-1k';
import { MyCo } from 'component/my-component';
import { Terms } from './terms-of-conditions';
import { keysM } from 'collection/typed-object';


export class LandingPage extends MyCo<{}, {}> {
  // @ts-ignore
  $container: Container;

  private inj(module: any, name: string): Component {
    console.log(`members ${JSON.stringify(keysM(module))}`);
    return inject(module.default, new FwdContainer(this.$container).sBean('bundleName', name));
  }

  TodoList = async () => await import('./todo-list').then(m => this.inj(m, 'todoList'));

  NewTodo = async () => await import('./new-todo').then(m => this.inj(m, 'newTodo'));

  render() {
    return <Router>
      <Route path='/' component={inject(Terms, this.$container)} />
      <AsyncRoute path='/todo-list' getComponent={this.TodoList} />
      <AsyncRoute path='/new-todo' getComponent={this.NewTodo} />
    </Router>;
  }
}
