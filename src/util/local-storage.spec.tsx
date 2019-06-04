import { LocalStorage } from './local-storage';

describe('local-storage-wrapper',
	() => {
		 it('store, clean => no keys', () => {
		   const ls = new LocalStorage();
			 ls.store('hello', 'world');
			 ls.clearAll();
			 expect(ls.allKeys()).toEqual([]);
		 });
		 it('store get match', () => {
		 	 const ls = new LocalStorage();
			 ls.store('hello', 'world');
		   expect(ls.get('hello')).toBe('world');
  	});
});
