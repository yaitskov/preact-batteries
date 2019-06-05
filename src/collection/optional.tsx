export const opt = <T extends {} >(v: T | null): Opt<T> => new Opt(v);
export const nic = <T extends {} >(): Opt<T> => opt<T>(null);

export class Opt<T> {
  private has: boolean;

  constructor(private v: T | null) {
    this.has = v !== null;
  }

  public get empty(): boolean {
    return !this.has;
  }

  public el(e: T): T {
    return this.has ? (this.v as T) : e;
  }

  public get full(): boolean {
    return this.has;
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

  public ifV(f: (v: T) => void): void {
    if (this.has) {
      f(this.v as T);
    }
  }

  public ifVE(f: (v: T) => void, o: () => void): void {
    if (this.has) {
      f(this.v as T);
    } else {
      o();
    }
  }
}
