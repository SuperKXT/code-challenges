import {
	objectEntries,
	objectKeys,
	objectValues,
	omit,
	pick,
} from './object.helpers';

describe('testing objectEntries', () => {
	it('should return the correct value and types for object entries', () => {
		const object = { first: 1, second: 2 } as const;
		const entries = objectEntries(object);
		expect(entries).toStrictEqual([
			['first', 1],
			['second', 2],
		]);
		assertType<['first' | 'second', 1 | 2][]>(entries);
	});
});

describe('testing objectKeys', () => {
	it('should return the correct value and types for object keys', () => {
		const object = { first: 1, second: 2 } as const;
		const keys = objectKeys(object);
		expect(keys).toStrictEqual(['first', 'second']);
		assertType<('first' | 'second')[]>(keys);
	});
});

describe('testing objectValues', () => {
	it('should return the correct value and types for object values', () => {
		const object = { first: 1, second: 2 } as const;
		const values = objectValues(object);
		expect(values).toStrictEqual([1, 2]);
		assertType<(1 | 2)[]>(values);
	});
});

describe('testing omitKey', () => {
	it('should remove a single key from object', () => {
		const omitted = { first: 1 };
		const object = { ...omitted, second: 2 };
		const result = omit(object, 'second');
		expect(result).toStrictEqual(omitted);
		assertType<typeof omitted>(result);
	});
	it('should remove multiple keys from the object', () => {
		const omitted = { first: 1 };
		const object = { ...omitted, second: 2, third: 3 };
		const result = omit(object, ['second', 'third']);
		expect(result).toStrictEqual(omitted);
		assertType<typeof omitted>(result);
	});
});

describe('testing pickKey', () => {
	it('should pick a single key from object', () => {
		const picked = { a: 1 };
		const object = { ...picked, b: 2 };
		const result = pick(object, 'a');
		expect(result).toStrictEqual(picked);
		assertType<typeof picked>(result);
	});
	it('should pick multiple keys from the object', () => {
		const picked = { a: 1, b: 2 };
		const object = { ...picked, c: 3 };
		const result = pick(object, ['a', 'b']);
		expect(result).toStrictEqual(picked);
		assertType<typeof picked>(result);
	});
});
