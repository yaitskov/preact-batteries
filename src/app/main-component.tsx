import { h, Component } from 'preact';

import { Router, Route, route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { inject, Container } from 'injection/inject-1k';
import { InjSubCom } from 'injection/inject-sub-components';
import { Instantiable, gNew, Tobj, keysM } from 'collection/typed-object';
//import { I18Trans } from 'i18n/i18n-translator';

interface AsyncModule {
  default: (name: string, mainContainer: Container) => Instantiable<Component>;
  //  default: Instantiable<Component>;
}

//import { LandingPage } from 'app/landing-page';

export class MainCom extends InjSubCom<{}, {}> {
  // @ts-ignore
  // $bundlesCtx: Tobj<FwdContainer>;

  private inj(module: AsyncModule, name: string): Instantiable<Component> {
    return module.default(name, this.$container);
  }

  LPG = async () => await import('./page/landing-page')
    .then(m => this.inj(m as AsyncModule, 'landing-page'));

  Terms = async () => await import('./page/terms-of-service')
    .then(m => this.inj(m as AsyncModule, 'terms-of-service'));

  Privacy = async () => await import('./page/privacy')
    .then(m => this.inj(m as AsyncModule, 'privacy'));

  TodoList = async () => await import('./todo-list').then(m => this.inj(m as AsyncModule, 'todo-list'));

  NewTodo = async () => await import('./new-todo').then(m => this.inj(m as AsyncModule, 'new-todo'));

  SignUp = async () => await import('app/page/sign-up/sign-up').then(m => this.inj(m as AsyncModule, 'sign-up'));

  // SignIn = async () => await import('./app/page/sign-in').then(m => this.inj(m as AsyncModule, 'sign-in'));
  // <AsyncRoute path='/sign-in' getComponent={this.SignIn} />
  // <Route path='/' component={this.c(Terms)} />

  render() {
    return <Router>
      <AsyncRoute path='/' getComponent={this.LPG} />
      <AsyncRoute path='/terms' getComponent={this.Terms} />
      <AsyncRoute path='/privacy' getComponent={this.Privacy} />
      <AsyncRoute path='/todo-list' getComponent={this.TodoList} />
      <AsyncRoute path='/new-todo' getComponent={this.NewTodo} />
      <AsyncRoute path='/sign-up' getComponent={this.SignUp} />
    </Router>;
  }
}
