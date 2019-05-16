import { h } from 'preact';
import { MyCo } from 'component/my-component';
import { Container, inject } from 'injection/inject-1k';
import { Sform } from 'component/form/sform';
import { Submit } from 'component/form/submit';
import { ActionField } from 'app/action-field';
import { PriorityField } from 'app/priority-field';

export interface ToDo {
  action: string;
  priority: number;
}

export interface ToDoFormP {
  onSubmit: (d: object) => void;
  todo: ToDo;
}

export class ToDoForm extends MyCo<ToDoFormP, {}> {
  // @ts-ignore TS2564
  private $container: Container;

  render() {
    const SformI = inject(Sform, this.$container);
    const SubmitI = inject(Submit, this.$container);
    const ActionFieldI = inject(ActionField, this.$container);
    const PriorityFieldI = inject(PriorityField, this.$container);

    return <SformI data={this.props.todo}
                   onSend={e => this.props.onSubmit(this.props.todo)}>
      <ActionFieldI></ActionFieldI>
      <PriorityFieldI></PriorityFieldI>
      <SubmitI text="apply" />
    </SformI>;
  }
}
