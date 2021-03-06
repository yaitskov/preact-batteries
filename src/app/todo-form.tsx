import { h } from 'preact';
import { InjSubCom } from 'injection/inject-sub-components';
import { Sform } from 'component/form/sform';
import { Submit } from 'component/form/submit';
import { ActionField } from 'app/action-field';
import { PriorityField } from 'app/priority-field';

export interface ToDo {
  action: string;
  priority: number;
}

export interface ToDoFormP {
  onSubmit: (d: ToDo) => void;
  todo: ToDo;
}

export class ToDoForm extends InjSubCom<ToDoFormP, {}> {
  render() {
    const [SformI, SubmitI, ActionFieldI, PriorityFieldI] =
      this.c4(Sform, Submit, ActionField, PriorityField);

    return <SformI data={this.props.todo}
                   onSend={e => this.props.onSubmit(this.props.todo)}>
      <ActionFieldI></ActionFieldI>
      <PriorityFieldI></PriorityFieldI>
      <SubmitI text="apply" />
    </SformI>;
  }
}
