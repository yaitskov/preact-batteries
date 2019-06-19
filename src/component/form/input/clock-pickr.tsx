import { h } from 'preact';

import { MyCo } from 'component/my-component';
import { jne } from 'collection/join-non-empty';
import { onEvent } from 'util/on-event';
import { getByClass } from 'util/get-by-class';
import { Opt, nic, opt } from 'collection/optional';

import clocklet from "clocklet";

import "clocklet/css/clocklet.min.css";
import bulma from 'bulma/bulma.sass';

export interface ClockPickrP {
  onChng: (d: string) => void;
  val: string;
  css?: string;
}

export interface ClockPickrS {
  node: Opt<HTMLInputElement>;
}

export class ClockPickr extends MyCo<ClockPickrP, ClockPickrS> {
  constructor(props) {
    super(props);
    this.st = {node: nic()};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    clocklet.open(this.st.node.val, {...clocklet.defaultOptions, format: 'hh:mm a'});
  }

  dMnt() {
    this.st.node.ifV(node => {
      node.setAttribute('readonly', 'true');
      onEvent(node, 'input', this.props.onChng);
      onEvent(node, 'clocklet.opened', () => {
        getByClass(document, 'clocklet-tick--minute').forEach(
          minuteBtn => onEvent(minuteBtn, 'click', () => clocklet.close()));
      });
    });
  }

  render(p, st) {
    return <input class={jne(bulma.input, this.props.css)}
                  value={this.props.val}
                  onClick={this.onClick}
                  ref={node => this.st.node = opt(node)} />;
  }
}
