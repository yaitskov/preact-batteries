import { asyncIt, isA } from './test-utils';
import { Invalid } from './invalid';
import { Validator, Max, Min, Match, IntType, NotEmpty, ValiChain } from './validation';

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

  describe('not empty', () => {
    pass('0', new NotEmpty(), '0');
    pass('letter', new NotEmpty(), 'a');
    reject('empty string', new NotEmpty(), '');
  });

  describe('match', () => {
    pass('exact', new Match(/^aaa$/), 'aaa');
    reject('sub', new Match(/^a$/), 'aaa');
  });

  describe('vali chain', () => {
    pass('both pass', new ValiChain([new Match(/^a$/), new Match(/^.$/)]), 'a');
    pass('empty', new ValiChain([]), 'a');
    reject('last rejects', new ValiChain([new Match(/^a$/), new Match(/^b$/)]), 'a');
    reject('first rejects', new ValiChain([new Match(/^b$/), new Match(/^a$/)]), 'a');
  });
});
