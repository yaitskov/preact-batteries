import { h } from 'preact';
import { MyCo } from './my-component';
import { Wm } from './will-mount';
import { Valiform, FormLevel } from './form-validation';

export interface SformP {
  data: Map<string, string>;
  onSend: (d: Map<string, string>) => void;
}

export class Sform extends MyCo<SformP> {
  // @ts-ignore
  $valiform: Valiform;
  // @ts-ignore
  form: FormLevel;

  protected wMnt(): void {
    this.$valiform.newForm();
    this.form = this.$valiform.topForm();
    this.form.setSubmit(this.props.onSend);
  }

  protected dMnt(): void {
    this.form.setValue(this.props.data);
  }

  render() {
    // @ts-ignore
    return <div>
      {this.props.children}
      <Wm c={() => this.$valiform.endForm()}/>
    </div>;
  }
}
