import { render, h, Component } from 'preact';
import { injectable, inject, Container } from 'inversify';
import "reflect-metadata";

@injectable()
class PrintService {
  print(b: Book) {
    const t = `book summary ${b.getSummary().getText()}`;
    console.log(t);
    return t;
  }
}

@injectable()
class Summary {
  getText() {
    return "very good";
  }
}

@injectable()
class Author {
}

@injectable()
class Book {
  @inject("Author")
  // @ts-ignore TS2564
  private _author: Author;
  @inject("Summary")
  // @ts-ignore TS2564
  private _summary: Summary;

  @inject("PrintService")
  // @ts-ignore TS2564
  private _printService: PrintService;


  print() {
    return this._printService.print(this);
  }

  public getSummary() : Summary {
    return this._summary;
  }
}

let container = new Container();

container.bind<PrintService>("PrintService").to(PrintService);
container.bind<Author>("Author").to(Author);
container.bind<Summary>("Summary").to(Summary);
container.bind<Book>("Book").to(Book);

let book = container.get<Book>("Book");

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
