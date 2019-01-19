import { render, h, Component } from 'preact';

class Class1 {
}

class SubClass extends Class1 {
}

interface IX {
}


class ZenIm implements IX {
}

class ExtPreact extends Component {
  render() {
    return <h1> hello world </h1>;
  }
}

const objects : any[] = [new Class1(), new SubClass(), new ZenIm(), new ExtPreact() ];

class Beans {
  dataField: number = 1;
  emptyField: string;

  constructor() {

  }

  lf = () => 888;

  f1() {
    return "f1";
  }

  d2() {
    return 2;
  }
}

const beans = new Beans();

render(
  <div>
    <h1>Class names</h1>
    <ul>
      {objects.map(o => <li>{o.constructor.name}</li>)}
    </ul>
    <h1>Class methods</h1>
    <ul>
      {
        Object.getOwnPropertyNames(Beans.prototype).map(
          p => <li>{p} : {typeof Beans.prototype[p]}</li>
        )
      }
    </ul>

    <h1>Class fields</h1>
    <ul>
      {
        Object.getOwnPropertyNames(beans).map(
          p => <li>{p} : {typeof beans[p]}</li>
        )
      }
    </ul>

  </div>, document.body);
