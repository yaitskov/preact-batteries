import { Thenable } from './abortable-promise';

export const die = (msg: string) => { throw new Error(msg); };

export const unreachable = () => die("Unreachable");

export function asyncIt<T>(msg: string, v: Thenable<T>, c: (m: jasmine.Matchers<T>) => void) {
  it(msg, (done) => {
    v.tnr(r => c(expect(r)));
    done();
  });
}

export function isA(t: any): any {
  return jasmine.any(t) as any;
}
