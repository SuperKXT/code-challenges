import { z } from 'zod';

import {
	objectEntries,
	objectKeys,
	objectValues,
	omitKey,
} from './object.helpers';

describe('testing objectEntries', () => {
	it('should return the correct value and types for object entries', () => {
		const object = { a: 1, b: 2 } as const;
		const entries = objectEntries(object);
		expect(entries).toStrictEqual([
			['a', 1],
			['b', 2],
		]);
		z.util.assertEqual<typeof entries, ['a' | 'b', 1 | 2][]>(true);
	});
});

describe('testing objectKeys', () => {
	it('should return the correct value and types for object keys', () => {
		const object = { a: 1, b: 2 } as const;
		const keys = objectKeys(object);
		expect(keys).toStrictEqual(['a', 'b']);
		z.util.assertEqual<typeof keys, ('a' | 'b')[]>(true);
	});
});

describe('testing objectValues', () => {
	it('should return the correct value and types for object values', () => {
		const object = { a: 1, b: 2 } as const;
		const values = objectValues(object);
		expect(values).toStrictEqual([1, 2]);
		z.util.assertEqual<typeof values, (1 | 2)[]>(true);
	});
});

describe('testing omitKey', () => {
	it('should remove a single key from object', () => {
		const omitted = { a: 1 };
		const object = { ...omitted, b: 2 };
		const result = omitKey(object, 'b');
		expect(result).toStrictEqual(omitted);
		z.util.assertEqual<typeof result, typeof omitted>(true);
		z.util.assertEqual<typeof result, typeof object>(false);
	});
	it('should remove multiple keys from the object', () => {
		const omitted = { a: 1 };
		const object = { ...omitted, b: 2, c: 3 };
		const result = omitKey(object, ['b', 'c']);
		expect(result).toStrictEqual(omitted);
		z.util.assertEqual<typeof result, typeof omitted>(true);
		z.util.assertEqual<typeof result, typeof object>(false);
	});
});
