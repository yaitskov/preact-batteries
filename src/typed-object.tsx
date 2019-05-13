export interface Tobj<T> {
  [k: string]: T;
}


export const forM = <T extends {} >(m: Tobj<T>, c: (a: [string, T]) => void): void => Object.entries(m).forEach(c);
export const mapO = <T extends {}, R extends {} >(m: Tobj<T>, f: (a: [string, T]) => R): R[] => Object.entries(m).map(f);

export const keysM = <T extends {} >(m: Tobj<T>): string[] => Object.keys(m);
export const emptyM = <T extends {} >(m: Tobj<T>): boolean => !keysM(m).length;

export const idx = <T extends {} >(e: T, a: T[]): number => a.indexOf(e);
export const aHas = <T extends {} >(e: T, a: T[]): boolean => idx(e, a) >= 0;
export const toMap = <T extends {}, V extends {} >(
  a: T[], keyF: (e: T) => string, valueF: (e: T) => V): Tobj<V> => a.reduce((m, e) => (m[keyF(e)] = valueF(e), m), {});
