export class Invalid {
  constructor(public msgTmp: string,
              public checkerName: string,
              public params: Map<string, any>) {}
}

export interface Validator {
  name(): string;
  check(val: string): Invalid[];
}

abstract class AbsValidator implements Validator {
  protected abstract valid(val: string): boolean;
  protected abstract msgTpl(): string;

  check(val: string): Invalid[] {
    if (this.valid(val)) {
      return [];
    }
    return [new Invalid(this.msgTpl(), this.name(), {})];
  }
}

export class Max extends AbsValidator {
  constructor(public mx: number) {
    super();
  }
  name() { return 'max'; }
  protected valid(val: string): boolean {
    return val <= this.mx;
  }
  protected msgTpl(): string {
    return `value greater than ${this.mx}`;
  }
}

export class Min extends AbsValidator {
  constructor(public mn: number) {
    super();
  }
  name() { return 'min'; }
  protected valid(val: string): boolean {
    return val >= this.mn;
  }
  protected msgTpl(): string {
    return `value less than ${this.mn}`;
  }
}

export class Match extends AbsValidator {
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

export class NotNull extends AbsValidator {
  name() { return '!n'; }
  protected valid(val: string): boolean {
    return val !== null;
  }
  protected msgTpl(): string {
    return null; // `value doesn't match ${this.p}`;
  }
}

export class NotEmpty extends AbsValidator {
  name() { return `!e`; }
  protected valid(val: string): boolean {
    return val && val !== '';
  }
  protected msgTpl(): string {
    return `field is required`;
  }
}

export class IntType extends AbsValidator {
  name() { return 'i'; }
  protected valid(val: string): boolean {
    return (''+val).match(/^[0-9]{1,10}$/);
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

  check(val: string): Invalid[] {
    return this.sub.flatMap(subV => subV.check(val));
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

  build(validatorChain: string, fieldName: string): Validator {
    return new ValiChain(validatorChain.split(chainSplit).filter(w => w).map(check => {
      let [name, ...args] = check.split(partSplit);
      const factory = valFactories[name];
      if (!factory) {
        throw new Error(`Bad validator ${name} for field ${fieldName}`);
      }
      return factory(...args);
    }));
  }
}
