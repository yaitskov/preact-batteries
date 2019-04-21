import { MyCo } from './my-component';
import { DomLookup } from './dom-lookup';

export interface NameP {
  name: string;
}

export class Pop extends MyCo<NameP> {
  $ldom: DomLookup;

  wMnt(): void {
    this.$ldom.pop(this.props.n);
  }
}
