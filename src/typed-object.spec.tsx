
import { emptyM } from './typed-object';


describe('typed object functions', () => {
  describe('emptyM', () => {
    it('empty true', () => expect(emptyM({})).toBe(true));
    it('1 key false', () => expect(emptyM({a: undefined})).toBe(false));
  });
});
