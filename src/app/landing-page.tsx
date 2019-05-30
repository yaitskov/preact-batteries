import { h, Component } from 'preact';
import { Router, Route, route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { inject, FwdContainer } from 'injection/inject-1k';
import { InjSubCom } from 'injection/inject-sub-components';
import { Terms } from 'app/terms-of-conditions';
import { Instantiable, gNew, Tobj, keysM } from 'collection/typed-object';
import { I18Trans } from 'i18n/i18n-translator';

interface AsyncModule {
  default: Instantiable<Component>;
}

export class LandingPage extends InjSubCom<{}, {}> {
  // @ts-ignore
  $bundlesCtx: Tobj<FwdContainer>;

  private inj(module: AsyncModule, name: string): Instantiable<Component> {
    return inject(module.default,
                  gNew(this.$bundlesCtx,
                       name,
                       () => new FwdContainer(this.$container)
                         .sBean('bundleName', name)
                         .sBeanInj('i18Trans', new I18Trans())));
  }

  TodoList = async () => await import('./todo-list').then(m => this.inj(m as AsyncModule, 'todo-list'));

  NewTodo = async () => await import('./new-todo').then(m => this.inj(m as AsyncModule, 'new-todo'));

  render() {
    return <Router>
      <Route path='/' component={this.c(Terms)} />
      <AsyncRoute path='/todo-list' getComponent={this.TodoList} />
      <AsyncRoute path='/new-todo' getComponent={this.NewTodo} />
    </Router>;
  }
}
