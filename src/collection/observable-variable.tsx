
export type SetWatcher<T> = (v: T) => void;

export class ObVar<T> {
  private watchers: SetWatcher<T>[] = [];

  constructor(private v: T) {
  }

  public onSet(sw: SetWatcher<T>) {
    this.watchers.push(sw);
  }

  public set val(newValue: T) {
    this.v = newValue;
  }

  public get val(): T {
    return this.v;
  }
}
