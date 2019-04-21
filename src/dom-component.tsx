import { h } from 'preact';
import { Container, inject } from './inject-1k';
import { DomLookup } from './dom-lookup';
import { MyCo } from './my-component';
import { Pop } from './pop';

export interface Named {
  name: string;
}

export class DomCom<T extends Named> extends MyCo<T> {
  private $container: Container;
  private $ldom: DomLookup;
  private pop: Pop;

  wMnt(): void {
    this.pop = inject(Pop, this.$container);
    this.$ldom.push(this.props.name);
  }

  render() {
    const PopI = this.pop;
    return <div>{this.props.children}<PopI n={this.props.name}/></div>;
  }
}
