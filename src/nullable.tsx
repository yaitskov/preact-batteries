export function opCall<T>(obj: T, applicator: (o: T) => T): T {
  obj ? applicator(obj) : obj
}
