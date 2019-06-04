import { Tobj } from 'collection/typed-object';


export class LocalStorage {
	constructor() {
		this.ls = localStorage;
	}

	public store(key: string, value: string): void {
		this.ls.setItem(key, value);
	}

	public get(key: string): string | null {
		return this.ls.getItem(key);
	}

	public clearAll(): void {
    while (this.ls.length > 0) {
      this.ls.removeItem(this.ls.key(0));
    }
	}

	public drop(key: string): void {
		this.ls.removeItem(key);
	}

	public allKeys(): string[] {
		const result = [];
		for (var i = 0; i < this.ls.length; ++i) {
			result.push(this.ls.key(i));
		}
		return result;
	}

	public asMap(): Tobj<string> {
		const result = {};
		this.allKeys().forEach(key => result[key] = this.get(key));
		return result;
	}
}
