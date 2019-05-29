import { h, Component } from 'preact';
import { Router, Route, route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { inject, FwdContainer, Container } from 'injection/inject-1k';
import { MyCo } from 'component/my-component';
import { Terms } from 'app/terms-of-conditions';
import { gNew, Tobj, keysM } from 'collection/typed-object';
import { I18Trans } from 'i18n/i18n-translator';


export class LandingPage extends MyCo<{}, {}> {
  // @ts-ignore
  $container: Container;
  // @ts-ignore
  $bundlesCtx: Tobj<FwdContainer>;

  private inj(module: any, name: string): Component {
    return inject(module.default,
                  gNew(this.$bundlesCtx,
                       name,
                       () => new FwdContainer(this.$container)
                         .sBean('bundleName', name)
                         .sBeanInj('i18Trans', new I18Trans())));
  }

  TodoList = async () => await import('./todo-list').then(m => this.inj(m, 'todo-list'));

  NewTodo = async () => await import('./new-todo').then(m => this.inj(m, 'new-todo'));

  render() {
    return <Router>
      <Route path='/' component={inject(Terms, this.$container)} />
      <AsyncRoute path='/todo-list' getComponent={this.TodoList} />
      <AsyncRoute path='/new-todo' getComponent={this.NewTodo} />
    </Router>;
  }
}
