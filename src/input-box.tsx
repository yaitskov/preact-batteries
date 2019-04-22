import { h } from 'preact';
import { MyCo } from './my-component';
import { Wm } from './will-mount';
import { Valiform, FormLevel } from './form-validation';

/**
  draw scope for input listeners
*/
export class InputBox extends MyCo {
  // @ts-ignore
  $valiform: Valiform;
  // @ts-ignore
  form: FormLevel;

  // ensure that previous box is complete
  protected wMnt(): void {
    this.form = this.$valiform.topForm();
    this.form.noListeners();
  }

  // complete box
  private flush(): void {
    this.form.flush();
  }

  render() {
    // @ts-ignore
    return <div>{this.props.children}<Wm c={() => this.flush()}/></div>; //[0];
  }
}
