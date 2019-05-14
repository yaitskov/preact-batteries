import { asyncIt, isA } from './test-utils';
import { Invalid } from './invalid';
import { Validator, Max, Min, Match, NotNull, IntType, NotEmpty } from './validation';

function pass(msg: string, validator: Validator, value: string) {
  asyncIt('pass ' + msg, validator.check(value), c => c.toEqual([]));
}

function reject(msg: string, validator: Validator, value: string) {
  asyncIt('reject ' + msg, validator.check(value), c => c.toEqual([isA(Invalid)]));
}

describe('validation', () => {
  describe('max', () => {
    pass('eq', new Max(10), '10');
    pass('less', new Max(10), '9');
    reject('more', new Max(10), '11');
  });

  describe('min', () => {
    pass('eq', new Min(10), '10');
    reject('less', new Min(10), '9');
    pass('more', new Min(10), '11');
  });

  describe('int type', () => {
    pass('zero', new IntType(), '0');
    reject('negative', new IntType(), '-9');
    reject('letter', new IntType(), '1l1');
  });

  describe('not null', () => {
    pass('0', new NotNull(), '0');
    reject('null', new NotNull(), null);
    pass('undefined', new NotNull(), undefined);
    pass('empty string', new NotNull(), '');
  });

  describe('not empty', () => {
    pass('0', new NotEmpty(), '0');
    pass('letter', new NotEmpty(), 'a');
    reject('null', new NotEmpty(), null);
    reject('undefined', new NotEmpty(), undefined);
    reject('empty string', new NotEmpty(), '');
  });

  describe('match', () => {
    pass('exact', new Match(/^aaa$/), 'aaa');
    reject('sub', new Match(/^a$/), 'aaa');
  });
});
