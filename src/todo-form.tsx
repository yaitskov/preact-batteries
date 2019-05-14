import { h } from 'preact';
import { MyCo } from './my-component';
import { Container, inject } from './injection/inject-1k';
// import { Thenable } from './abortable-promise';
import { Sform } from './sform';
import { Submit } from './submit';
import { ActionField } from './action-field';
import { PriorityField } from './priority-field';

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
