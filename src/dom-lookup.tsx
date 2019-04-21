import { opCall } from './nullable';

type TagName = string;
type DomTag = object;

export class DomLookup {
  private stack: Array<[TagName, DomTag]> = [];

  public push(name: TagName, tag: DomTag): void {
    console.log(`push ${name}`);
    this.stack.unshift([name, tag]);
  }

  public pop(name: TagName): void {
    console.log(`pop ${name}`);
    this.stack.shift();
  }

  public find(name: TagName): DomTag {
    return opCall(this.stack.find((o) => o[0] == name), o => o[1]);
  }
}
