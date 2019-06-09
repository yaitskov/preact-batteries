import { h } from 'preact';
import { MyCo } from 'component/my-component';
import { Valiform, FormLevel } from 'component/form/validation/form-validation';

import bulma from 'bulma/bulma.sass';

export interface SubmitP {
  t$text: string;
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
    return <div class={bulma.control}>
      <input class={bulma.button + ' ' + bulma['is-link']} type="submit"
             value={this.props.t$text} onClick={this.onClick} />
    </div>;
  }
}
