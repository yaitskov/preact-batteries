export interface Tobj<T> {
  [k: string]: T;
}


export const forM = <T extends {} >(m: Tobj<T>, c: (a: [string, T]) => void): void => Object.entries(m).forEach(c);
export const mapO = <T extends {}, R extends {} >(m: Tobj<T>, f: (a: [string, T]) => R): R[] => Object.entries(m).map(f);
