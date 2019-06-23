import { h } from 'preact';
import { MyCo } from 'component/my-component';
import removeEmptyVals from 'collection/remove-empty-values';
import { jne } from 'collection/join-non-empty';

import 'flatpickr/dist/flatpickr.css';
import Flatpickr from 'flatpickr/dist/flatpickr.js';

export interface DayPickrP {
  onChng: (d: string) => void;
  fmt: string;
  val: string;
  css?: string;
  min?: string;
  max?: string;
}

export class DayPickr extends MyCo<DayPickrP, {}> {
  // @ts-ignore
  node: HTMLElement;
  // @ts-ignore
  pickr: Flatpickr;

  dMnt() {
    this.pickr = new Flatpickr(
      this.node,
      removeEmptyVals({
        altInputClass: this.props.css,
        minDate: this.props.min,
        maxDate: this.props.max,
        dateForma: this.props.fmt,
        onChange: (dts, ld) => this.props.onChng(ld)
      }));
  }

  wUmt() {
    this.pickr.destroy();
  }

  render() {
    return <input class={jne(this.props.css)}
                  value={this.props.val}
                  ref={node => this.node = node} />;
  }
}
