export interface Abortable {
  abort(): void;
}

export interface Thenable<P> extends Abortable {
  p: Promise<P>;
  tn<N>(f: (d: P) => N): Thenable<N>;
  tnr(f: (d: P) => void): Thenable<P>;
  ctch(f: (e) => void): Thenable<P>;
  // fnl(f: (e) => void): Thenable<P>;
}

export class AbrPro<P> implements Thenable<P> {
  constructor(public p: Promise<P>,
              private pre: Abortable) {}

  public tnr(f: (x: P) => void): Thenable<P> {
    return this.tn<P>((a) => { f(a); return a; })
  }

  public tn<N>(f: (x: P) => N): Thenable<N> {
    return new AbrPro<N>(this.p.then(f), this);
  }

  public ctch(f: (e) => void): Thenable<P> {
    this.p = this.p.catch(f) as Promise<P>;
    return this;
  }

  /* public fnl(f: (e) => void): Thenable<P> {
   *   this.p = this.p.finally(f) as Promise<P>;
   *   return this;
   * }
   */

  public abort(): void {
    this.pre.abort();
  }
}

export function resolved<T>(v: T): Thenable<T> {
  return new AbrPro<T>(Promise.resolve(v), {abort: () => {}});
}

export function tJoin<T>(thenables: Thenable<T>[]): Thenable<T[]> {
  return new AbrPro<T[]>(
    Promise.all(thenables.map(t => t.p)),
    {abort: () => thenables.forEach(t => t.abort())});
}
