import { render, h, Component } from 'preact';
import { Container, inject } from './inject-1k';
import { NameForm } from './name-form';

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

class Foo extends Component {
  // @ts-ignore TS2564
  $book: Book;

  subRender() {
    return <li>{this.$book.print()}</li>;
  }

  render() {
    return <ul>{ this.subRender() }</ul>;
  }
}

const FooI = inject(Foo, container);

render(
  <div>
    <h1>Class names</h1>
    <FooI/>
    <h1>name Form</h1>
    <NameForm value="" />
  </div>, document.body);
