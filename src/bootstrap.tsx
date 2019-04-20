import { render, h, Component } from 'preact';
import { Container, inject } from './inject-1k';
import { NameForm } from './name-form';
import { TraceComponent } from './trace-component';
import { Sform } from './sform';
import { Submit } from './submit';
import { InputBox } from './input-box';
import { InputOk } from './input-ok';
import { InpErr } from './input-error';
import { InpHint } from './input-hint';
import { IfErr } from './if-error';
import { Valiform } from './form-validation';
import { Validation } from './validation';



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
      ['book', Book],
      ['valiform', Valiform],
      ['validation', Validation],
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
const SformI = inject(Sform, container);
const InputBoxI = inject(InputBox, container);
const InputOkI = inject(InputOk, container);
const InpErrI = inject(InpErr, container);
const IfErrI = inject(IfErr, container);
const InpHintI = inject(InpHint, container);
const SubmitI = inject(Submit, container);


function submitHandler(data) {
  console.log(`send data ${JSON.stringify(data)}`);
}

let dataHolder = {age: 0, gender: ''};



render(
  <div>
    <h1>Class names</h1>
    <FooI/>
    <h1>name Form</h1>
    <NameForm value="" />
    <h1>Trace</h1>
    <TraceComponent name="parent">
      <TraceComponent name="child"/>
    </TraceComponent>
    <h1>My Form framework</h1>
    <SformI data={dataHolder} onSend={e => submitHandler(dataHolder)}>
      <SubmitI text="apply" />
      <InputBoxI>
        <label>
          age
          <InputOkI svalid="min:16 max:65 !e i" field="age" />
        </label>
        <InpErrI>
          <IfErrI check="min">you are too young ;)</IfErrI>
        </InpErrI>
        <InpHintI>
          <p>enter your whole years</p>
        </InpHintI>
      </InputBoxI>
      <InputBoxI>
        <label>
          choice
          <InputOkI svalid="r:[ab]" field="choice" />
        </label>
        <InpErrI>
          <IfErrI check="r">too bad</IfErrI>
        </InpErrI>
        <InpHintI>
          <p>A oder B</p>
        </InpHintI>
      </InputBoxI>
      <InputBoxI>
        <label>
          gender
          <InputOkI svalid="r:[mf] !e" field="gender" />
        </label>
        <InpErrI name="gender-errors">
          <IfErrI check="r">straits only!</IfErrI>
        </InpErrI>
        <InpHintI>
          <p>enter your gender</p>
        </InpHintI>
      </InputBoxI>
      <SubmitI text="apply" />
    </SformI>
  </div>, document.body);
