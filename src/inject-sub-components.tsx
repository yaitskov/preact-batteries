import { MyCo } from './my-component';
import { Container, inject } from './injection/inject-1k';

type Type = any;

export abstract class InjSubCom<P, S> extends MyCo<P, S> {
  protected subComs: Map<Type, object> = new Map<Type, object>();
  // @ts-ignore TS2564
  protected $container: Container;

  componentWillMount() {
    this.injectSubComponents();
    this.wMnt();
  }

  protected injectSubComponents() {
    this.subComTypes().forEach(t => this.subComs[t] = inject(t, this.$container));
  }

  protected abstract subComTypes(): Type[];

  protected sCom(t: Type): object {
    return this.subComs[t];
  }
}
