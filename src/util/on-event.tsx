export const onEvent = <T extends {} > (
  element: Element,
  event: string,
  cb: (d: T) => void): void =>
    element.addEventListener(event as any, cb);
