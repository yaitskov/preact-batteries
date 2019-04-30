import { Tobj } from './typed-object';
import { Thenable, resolved, tJoin } from './abortable-promise';
import { InputCheckP } from './input-check-def';


type MessageTemplate = string;
type CheckName = string;


export class Invalid {
  constructor(public msgTmp: MessageTemplate,
              public name: CheckName,
              public params: Tobj<any>) {}
}

export interface Validator {
  name(): CheckName;
  check(val: string): Thenable<Invalid[]>;
}

const U = undefined;

// every validator instance (for every field it is applied)
// must have dispatcher to know whether validation is applied
class ValiCache implements Validator {
  // @ts-ignore TS2564
  private input: string | undefined;
  // @ts-ignore TS2564
  private res: Invalid[] | undefined;
  // @ts-ignore TS2564
  private ts: number;
  // @ts-ignore TS2564
  private pro: Thenable<Invalid[]> | undefined;
  // @ts-ignore TS2564
  private err: object | undefined;

  constructor(public base: Validator) {}

  public name(): string {
    return this.base.name();
  }

  public check(val: string): Thenable<Invalid[]> {
    let r: Thenable<Invalid[]>;
    if (this.input === U || this.input !== val) { // first time || different
      this.input = val;
      this.err = U;
      if (this.pro) {
        this.pro.abort();
      }
      r = this.pro = this.base.check(val).tn<Invalid[]>(
        v => {
          if (this.input === val) {
            this.res = v;
            this.ts = Date.now();
            this.pro = U;
          } else {
            console.log('late res ' + val);
          }
          return v;
        }).ctch(
          (e) => {
            if (this.input === val) {
              this.pro = U;
              this.err = e;
              this.res = this.input = U;
            } else {
              console.log('late reject ' + e);
            }
            throw e;
          }) as Thenable<Invalid[]>;
    } else { // input = val
      if (this.res === U) { // result is not ready
        r = this.pro as Thenable<Invalid[]>;
      } else if (Date.now() - this.ts < 800000) {
        r = resolved(this.res);
      } else {
        this.input = U;
        r = this.check(val);
      }
    }
    return r;
  }
}


class ValidatorF implements Validator {
  constructor(private n: string,
              private f: (s: string) => Thenable<Invalid[]>) {}

  check(val: string): Thenable<Invalid[]> {
    return this.f(val);
  }

  public name(): string {
    return this.n;
  }
}

abstract class SyncValidator implements Validator {
  protected abstract valid(val: string): boolean;
  protected abstract msgTpl(): string;

  public abstract name(): string;

  public check(val: string): Thenable<Invalid[]> {
    return resolved(this.syncCheck(val));
  }

  protected syncCheck(val: string): Invalid[] {
    if (this.valid(val)) {
      return [];
    }
    return [new Invalid(this.msgTpl(), this.name(), {})];
  }
}

export class Max extends SyncValidator {
  constructor(public mx: number) {
    super();
  }
  name() { return 'max'; }
  protected valid(val: string): boolean {
    return +val <= this.mx;
  }
  protected msgTpl(): string {
    return `value greater than ${this.mx}`;
  }
}

export class Min extends SyncValidator {
  constructor(public mn: number) {
    super();
  }
  name() { return 'min'; }
  protected valid(val: string): boolean {
    return +val >= this.mn;
  }
  protected msgTpl(): string {
    return `value less than ${this.mn}`;
  }
}

export class Match extends SyncValidator {
  constructor(public p: RegExp) {
    super();
    console.log(`match ${p}`);
  }
  name() { return 'r'; }
  protected valid(val: string): boolean {
    return this.p.test(val);
  }
  protected msgTpl(): string {
    return `value doesn't match ${this.p}`;
  }
}

export class NotNull extends SyncValidator {
  name() { return '!n'; }
  protected valid(val: string): boolean {
    return val !== null;
  }
  protected msgTpl(): string {
    return 'cannot be null'; // `value doesn't match ${this.p}`;
  }
}

export class NotEmpty extends SyncValidator {
  name() { return `!e`; }
  protected valid(val: string): boolean {
    return !!val && val !== '';
  }
  protected msgTpl(): string {
    return `field is required`;
  }
}

export class IntType extends SyncValidator {
  name() { return 'i'; }
  protected valid(val: string): boolean {
    return !!(''+val).match(/^[0-9]{1,10}$/);
  }
  protected msgTpl(): string {
    return `field is not integer number`;
  }
}

class ValiChain implements Validator {
  constructor(public sub: Validator[]) {
    console.log(`vali chain len = ${sub.length}`);
  }

  name(): string {
    return `validators(${this.sub.map(sv => sv.name()).join(' ')})`;
  }

  check(val: string): Thenable<Invalid[]> {
    return tJoin(this.sub.map(i => i.check(val))).tn((l) => l.flatMap(a => a));
  }
}

const valFactories = {
  'min': (l) => new Min(+l),
  'max': (l) => new Max(+l),
  '!e': () => new NotEmpty(),
  'i':  () => new IntType(),
  '!n': () => new NotNull(),
  'r': (pattern) => new Match(new RegExp(pattern))
};

const chainSplit = /(?<!\\)[ ]/;
const partSplit = /(?<!\\)[:]/;

export class Validation {
  private _validators: Map<string, Validator> = new Map<string, Validator>();

  build(vChain: InputCheckP[], fieldName: string): Validator {
    return vChain.length == 1 ? this.mkVali(vChain[0], fieldName)
         : new ValiChain(vChain.map(ic => this.mkVali(ic, fieldName)));
  }

  private mkVali(check: InputCheckP, fieldName: string): Validator {
    const t = typeof check.mit;
    if (t == "string") {
      return this.parseValiExpr(check.mit as string, fieldName);
    }
    if (t == "function") {
      return new ValiCache(
        new ValidatorF('-' + fieldName,
                       check.mit as (string) => Thenable<Invalid[]>));
    }
    throw new Error('bad mit type');
  }

  private parseValiExpr(valiExpr: string, fieldName: string): Validator {
    // group by event type (k c s)
    // parse string defined validators into promise factories
    // for every item define dispatcher
    return new ValiChain(valiExpr
      .split(chainSplit)
      .filter(w => w)
      .map(check => {
        let [name, ...args] = check.split(partSplit);
        const factory = valFactories[name];
        if (!factory) {
          throw new Error(`Bad validator ${name} for field ${fieldName}`);
        }
        return factory(...args);
      }));
  }
}
