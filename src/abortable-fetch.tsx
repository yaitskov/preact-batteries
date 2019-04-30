import { Thenable, AbrPro } from './abortable-promise';

export function abrFtc(url: string): Thenable<Response> {
  const ctrl = new AbortController();
  return new AbrPro<Response>(fetch(url, {signal: ctrl.signal}), ctrl);
}
