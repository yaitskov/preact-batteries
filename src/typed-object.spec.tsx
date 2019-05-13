
import { forM, mapO, emptyM } from './typed-object';


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

  describe('emptyM', () => {
    it('empty true', () => expect(emptyM({})).toBe(true));
    it('1 key false', () => expect(emptyM({a: undefined})).toBe(false));
  });
});
