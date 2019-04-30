import { Invalid } from './validation';
import { Thenable } from './abortable-promise';

// Key Up | Change | Submit
export type CheckOn = "k" | "c" | "s";

export type RegisteredValidatorDefinitions = string;
export type CustomValidator = (s: string) => Thenable<Invalid[]>;
export type ValidatorList = RegisteredValidatorDefinitions | CustomValidator;


export interface InputCheckP {
  on: CheckOn;
  mit: ValidatorList;
}
