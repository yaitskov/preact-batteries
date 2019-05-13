
import { forM, mapO, emptyM, keysM, idx, aHas } from './typed-object';


describe('typed object:', () => {
  describe('forM', () => {
    it('empty object', () => forM({}, (pair) => throw new Error('dead')));

    it('1 pair', () => {
      const r = [];
      forM({a: 2}, (pair) => r.push(pair));
      expect(r).toEqual([['a', 2]]);
    });
  });

  describe('mapO', () => {
    it('empty', () => expect(mapO({}, (pair) => throw new Error('dead'))).toEqual([]));
    it('1 pair', () => expect(mapO({a: 2}, (pair) => pair)).toEqual([['a', 2]]));
  });

  describe('keysM', () => {
    it('empty', () => expect(keysM({})).toEqual([]));
    it('1 pair', () => expect(keysM({a: 2})).toEqual(['a']));
  });

  describe('idx', () => {
    it('zero', () => expect(idx(1, [1, 2])).toBe(0));
    it('last', () => expect(idx(2, [1, 2])).toBe(1));
    it('missing', () => expect(idx(3, [1, 2])).toBe(-1));
  });

  describe('emptyM', () => {
    it('empty true', () => expect(emptyM({})).toBe(true));
    it('1 key false', () => expect(emptyM({a: undefined})).toBe(false));
  });
});
