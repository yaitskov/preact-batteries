import { h } from 'preact';
import { MyCo } from 'component/my-component';
import { Wm } from 'component/will-mount';
import { Valiform, FormLevel } from 'form-validation';

export interface SformP {
  data: object;
  onSend: (d: object) => void;
}

export class Sform extends MyCo<SformP, {}> {
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
