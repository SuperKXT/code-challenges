import { z } from 'zod';

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
		z.util.assertEqual<typeof entries, ['first' | 'second', 1 | 2][]>(true);
	});
});

describe('testing objectKeys', () => {
	it('should return the correct value and types for object keys', () => {
		const object = { first: 1, second: 2 } as const;
		const keys = objectKeys(object);
		expect(keys).toStrictEqual(['first', 'second']);
		z.util.assertEqual<typeof keys, ('first' | 'second')[]>(true);
	});
});

describe('testing objectValues', () => {
	it('should return the correct value and types for object values', () => {
		const object = { first: 1, second: 2 } as const;
		const values = objectValues(object);
		expect(values).toStrictEqual([1, 2]);
		z.util.assertEqual<typeof values, (1 | 2)[]>(true);
	});
});

describe('testing omitKey', () => {
	it('should remove a single key from object', () => {
		const omitted = { first: 1 };
		const object = { ...omitted, second: 2 };
		const result = omit(object, 'second');
		expect(result).toStrictEqual(omitted);
		z.util.assertEqual<typeof result, typeof omitted>(true);
		z.util.assertEqual<typeof result, typeof object>(false);
	});
	it('should remove multiple keys from the object', () => {
		const omitted = { first: 1 };
		const object = { ...omitted, second: 2, third: 3 };
		const result = omit(object, ['second', 'third']);
		expect(result).toStrictEqual(omitted);
		z.util.assertEqual<typeof result, typeof omitted>(true);
		z.util.assertEqual<typeof result, typeof object>(false);
	});
});

describe('testing pickKey', () => {
	it('should pick a single key from object', () => {
		const picked = { a: 1 };
		const object = { ...picked, b: 2 };
		const result = pick(object, 'a');
		expect(result).toStrictEqual(picked);
		z.util.assertEqual<typeof result, typeof picked>(true);
		z.util.assertEqual<typeof result, typeof object>(false);
	});
	it('should pick multiple keys from the object', () => {
		const picked = { a: 1, b: 2 };
		const object = { ...picked, c: 3 };
		const result = pick(object, ['a', 'b']);
		expect(result).toStrictEqual(picked);
		z.util.assertEqual<typeof result, typeof picked>(true);
		z.util.assertEqual<typeof result, typeof object>(false);
	});
});
