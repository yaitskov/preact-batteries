export const die = (msg: string) => { throw new Error(msg); };

export const unreachable = () => die("Unreachable");
