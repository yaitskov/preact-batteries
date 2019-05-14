import { asyncIt } from './test-utils';
import { Invalid } from './invalid';
import { Max, IntType, NotEmpty } from './validation';


describe('validation', () => {
  describe('max', () => {
    asyncIt('pass eq', new Max(10).check('10'), c => c.toEqual([]));
    asyncIt('pass less', new Max(10).check('9'), c => c.toEqual([]));
    asyncIt('reject more', new Max(10).check('11'), c => c.toEqual([jasmine.any(Invalid)] as any));
  });
});
