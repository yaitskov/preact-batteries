import { render, h, Component } from 'preact';
//import { injectable, inject, Container } from 'inversify';
//import "reflect-metadata";

interface Ctx {
}

interface Bean {
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

const once : Scope = 's';
const many : Scope = 'p';

class MetaBean<T extends Bean> {
  constructor(public clazz: Type<T>,
              public scope: Scope,
              public onInjected: (T, Container) => T) {}
}

class Container {
  private onceBeans: Map<string, Bean> = new Map<string, Bean>();
  private beanFactories: Map<string, MetaBean<any>> = new Map<string, MetaBean<any>>();

  bind(beanDefs: BeanDef<Bean>[]): Container {
    beanDefs.forEach(beanDef => this.bean(beanDef[0], beanDef[1],
                                          (beanDef[2] as Scope) || once,
                                          (beanDef[3] as OnInjected<Bean>) || ((o, g) => o)));
    return this;
  }

  bean<T>(name: string, clazz: Type<T>,
          scope: Scope, onInjected: OnInjected<T>): Container {
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
    this.injectDeps(name, bean, stack);
    return mb.onInjected(bean, this);
  }

  private injectDeps(name: string, bean: Bean, stack: string[]): void {
    dir(bean).forEach((n) => {
      if (n[0] === '$') {
        bean[n] = this.getByName(n, stack);
      }
    });
  }
}

class PrintService {
  print(b: Book) {
    const t = `book summary ${b.getSummary().getText()}`;
    console.log(t);
    return t;
  }
}

class Summary {
  getText() {
    return "very good";
  }
}

class Author {}

class Book {
  // @ts-ignore TS2564
  private $author: Author;
  // @ts-ignore TS2564
  private $summary: Summary;
  // @ts-ignore TS2564
  private $printService: PrintService;

  print() {
    return this.$printService.print(this);
  }

  public getSummary() : Summary {
    return this.$summary;
  }
}

let container = new Container();

container
  .bind(
    [
      ['printService', PrintService],
      ['author', Author, 's'],
      ['book', Book]
    ])
  .bean('summary', Summary, 'p', (s, c) => {
    console.log(`Created summary ${s.getText()}`);
    return s;
  });

let book = container.get("book");

function subRender() {
  return <li>{book.print()}</li>;
}

render(
  <div>
    <h1>Class names</h1>
    <ul>
      { subRender() }
    </ul>

  </div>, document.body);
