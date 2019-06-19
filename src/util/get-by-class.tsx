export const getByClass = (e: Document | Element, clazz: string): Element[] => Array.from(e.getElementsByClassName(clazz));
