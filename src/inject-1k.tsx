import { Component, h } from 'preact';

export interface Ctx {
}

export interface Bean {
}

function dir(o: any): string[] {
  return Object.getOwnPropertyNames(o);
}

type BeanName = string;
type Scope = 's' | 'p';
type OnInjected<T> = (b: T, c: Container) => T;

type FullBeanDef<T> = [BeanName, Type<T>, Scope, OnInjected<T>];
type BeanDef3<T> = [BeanName, Type<T>, Scope];
type BeanDef2<T> = [BeanName, Type<T>];
type BeanDef<T> = (BeanDef2<T> | BeanDef3<T> | FullBeanDef<T>);

export interface Type<T> extends Function { new (...args: any[]): T; }

export const once : Scope = 's';
export const many : Scope = 'p';

class MetaBean<T extends Bean> {
  constructor(public clazz: Type<T>,
              public scope: Scope,
              public onInjected: (T, Container) => T) {}
}

export class Container {
  private onceBeans: Map<string, Bean> = new Map<string, Bean>();
  private beanFactories: Map<string, MetaBean<any>> = new Map<string, MetaBean<any>>();

  bind(beanDefs: BeanDef<Bean>[]): Container {
    beanDefs.forEach(beanDef => this.bean(beanDef[0], beanDef[1],
                                          (beanDef[2] as Scope) || once,
                                          (beanDef[3] as OnInjected<Bean>) || ((o, g) => o)));
    return this;
  }

  bean<T>(name: string, clazz: Type<T>,
          scope: Scope = 's',
          onInjected: OnInjected<T> = (o, g) => o): Container {
            name = '$' + name;
            if (this.beanFactories[name]) {
              throw new Error(`factory name [${name}] is busy`);
            }
            this.beanFactories[name] = new MetaBean(clazz, scope, onInjected);
            return this;
          }

  get(name: string): any {
    return this.getByName('$' + name, []);
  }

  public sBean(name: string, obj: object): void {
    this.onceBeans['$' + name] = obj;
    return this;
  }

  private getByName(name: string, stack: string[]) {
    const b = this.onceBeans[name];
    if (b === undefined) {
      return this.newBean(name, stack);
    }
    return b;
  }

  private newBean(name: string, stack: string[]): Bean {
    if (name === stack[0]) {
      throw Error(`cycle dep ==> ${stack}`);
    }
    stack.push(name);
    const mb = this.beanFactories[name];
    if (mb === undefined) {
      throw new Error(`no factory for bean ${name}`);
    }
    const bean = new mb.clazz();
    if (mb.scope === once) {
      this.onceBeans[name] = bean;
    }
    this.injectDeps(bean, stack);
    return mb.onInjected(bean, this);
  }

  injectDeps<T>(bean: T, stack: string[]): void {
    dir(bean).forEach((n) => {
      if (n[0] === '$') {
        bean[n] = this.getByName(n, stack);
      }
    });
  }
}

export const inject = (T: any, container: Container): any => (
  class Enhance extends T {
    constructor(props) {
      super(props);
      container.injectDeps(this, []);
    }
  });
