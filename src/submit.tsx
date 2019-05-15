import { h } from 'preact';
import { MyCo } from 'component/my-component';
import { Valiform, FormLevel } from 'component/form/validation/form-validation';

export interface SubmitP {
  text: string;
}

export class Submit extends MyCo<SubmitP, {}> {
  // @ts-ignore
  $valiform: Valiform;
  // @ts-ignore
  form: FormLevel;

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  protected wMnt(): void {
    this.form = this.$valiform.topForm();
  }

  onClick(e) {
    this.form.trySubmit(e);
  }

  render() {
    return <input type="submit" value={this.props.text} onClick={this.onClick} />;
  }
}
