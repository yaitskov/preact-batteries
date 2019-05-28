
export function nic<T>(): Opt<T> {
  return new Opt<T>(null);
}

export class Opt<T> {
  private has: boolean;

  constructor(private v: T | null) {
    this.has = v !== null;
  }

  public get empty(): boolean {
    return !this.has;
  }

  public get val(): T {
    if (this.has) {
      return this.v as T;
    }
    throw new Error('no val');
  }

  public set val(newVal: T) {
    this.has = true;
    this.v = newVal;
  }

  public cls(): void {
    this.has = false;
  }
}
