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
type OnInjected = (b: Bean, c: Container) => Bean;

type FullBeanDef = [BeanName, Type<Bean>, Scope, OnInjected];
type BeanDef3 = [BeanName, Type<Bean>, Scope];
type BeanDef2 = [BeanName, Type<Bean>];
type BeanDef = (BeanDef2 | BeanDef3 | FullBeanDef);

export interface Type<T> extends Function { new (...args: any[]): T; }

const once : Scope = 's';
const many : Scope = 'p';

class MetaBean {
  constructor(public clazz: Type<Bean>,
              public scope: Scope,
              public onInjected: (Bean, Container) => Bean) {}
}

class Container {
  private onceBeans: Map<string, Bean> = new Map<string, Bean>();
  private beanFactories: Map<string, MetaBean> = new Map<string, MetaBean>();

  bind(beanDefs: BeanDef[]): Container {
    beanDefs.forEach(beanDef => {
      this.bean(beanDef[0], new MetaBean(
        beanDef[1],
        beanDef.length < 3 ? once : (beanDef[2] as Scope),
        beanDef.length < 4 ? (o, g) => o : (beanDef[3] as OnInjected)));
    });
    return this;
  }

  bean(name: string, meta: MetaBean): void {
    name = '$' + name;
    if (this.beanFactories[name]) {
      throw new Error(`factory name [${name}] is busy`);
    }
    this.beanFactories[name] = meta;
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

container.bind([
  ['printService', PrintService],
  ['author', Author, 's'],
  ['summary', Summary, 'p',
   (s, c) => {
     console.log(`Created summary ${(s as Summary).getText()}`);
     return s;
   }
  ],
  ['book', Book]]);

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
