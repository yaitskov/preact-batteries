import { asyncIt, isA } from './test-utils';
import { Invalid } from './invalid';
import { Validator, Max, IntType, NotEmpty } from './validation';

function pass(msg: string, validator: Validator, value: string) {
  asyncIt('pass ' + msg, validator.check(value), c => c.toEqual([]));
}

function reject(msg: string, validator: Validator, value: string) {
  asyncIt('reject ' + msg, validator.check(value), c => c.toEqual([isA(Invalid)]));
}

describe('validation', () => {
  describe('max', () => {
    asyncIt('pass eq', new Max(10).check('10'), c => c.toEqual([]));
    asyncIt('pass less', new Max(10).check('9'), c => c.toEqual([]));
    asyncIt('reject more', new Max(10).check('11'), c => c.toEqual([isA(Invalid)]));
  });

  describe('int type', () => {
    pass('zero', new IntType(), '0');
    reject('negative', new IntType(), '-9');
    reject('letter', new IntType(), '1l1');
  });
});
