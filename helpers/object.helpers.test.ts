import {
	deepMerge,
	groupArrayBy,
	objectEntries,
	objectKeys,
	objectToFormData,
	objectToSearchParams,
	objectValues,
	omit,
	pick,
} from './object.helpers.js';

test('testing objectEntries', () => {
	const object = { first: 1, second: 2 } as const;
	const entries = objectEntries(object);
	expect(entries).toStrictEqual([
		['first', 1],
		['second', 2],
	]);
	assertType<['first' | 'second', 1 | 2][]>(entries);
});

test('testing objectKeys', () => {
	const object = { first: 1, second: 2 } as const;
	const keys = objectKeys(object);
	expect(keys).toStrictEqual(['first', 'second']);
	assertType<('first' | 'second')[]>(keys);
});

test('testing objectValues', () => {
	const object = { first: 1, second: 2 } as const;
	const values = objectValues(object);
	expect(values).toStrictEqual([1, 2]);
	assertType<(1 | 2)[]>(values);
});

test('testing omit with a single key', () => {
	const omitted = { first: 1 };
	const object = { ...omitted, second: 2 };
	const result = omit(object, 'second');
	expect(result).toStrictEqual(omitted);
	assertType<typeof omitted>(result);
});

test('testing omit with multiple keys', () => {
	const omitted = { first: 1 };
	const object = { ...omitted, second: 2, third: 3 };
	const result = omit(object, 'second', 'third');
	expect(result).toStrictEqual(omitted);
	assertType<typeof omitted>(result);
});

test('testing pick with a single key', () => {
	const picked = { a: 1 };
	const object = { ...picked, b: 2 };
	const result = pick(object, 'a');
	expect(result).toStrictEqual(picked);
	assertType<typeof picked>(result);
});

test('testing pick with multiple keys', () => {
	const picked = { a: 1, b: 2 };
	const object = { ...picked, c: 3 };
	const result = pick(object, 'a', 'b');
	expect(result).toStrictEqual(picked);
	assertType<typeof picked>(result);
});

test('testing deepMerge', () => {
	const first = { a: 1, b: 'old', nested: { d: 1, e: 'old' } } as const;
	const second = { b: 'new', c: 3, nested: { e: 'new', f: 3 } } as const;
	const merged = {
		a: 1 as const,
		b: 'new' as const,
		c: 3 as const,
		nested: { d: 1 as const, e: 'new' as const, f: 3 as const },
	};
	const result = deepMerge(first, second);
	expect(result).toStrictEqual(merged);
	assertType<typeof merged>(result);
});

test('testing objectToFormData', () => {
	const first = { a: 1, b: 'old', nested: { d: 1, e: 'old' } };
	expect(() => {
		objectToFormData(first);
	}).toThrow(`invalid value for 'nested': form data does not allow 'object'`);
	const second = { b: 'new', c: 3, d: true };
	const result = objectToFormData(second);
	assertType<FormData>(result);
	expect(result.get('b')).toBe('new');
	expect(result.get('c')).toBe('3');
	expect(result.get('d')).toBe('true');
});

test('testing groupArrayBy', () => {
	const array1 = [
		{ foo: 1, bar: 1, baz: 1 },
		{ foo: 1, bar: 1, baz: 2 },
		{ foo: 1, bar: 2, baz: 1 },
		{ foo: 1, bar: 2, baz: 2 },
		{ foo: 1, bar: 2, baz: 3 },
		{ foo: 1, bar: 3, baz: 1 },
		{ foo: 2, bar: 1, baz: 1 },
		{ foo: 2, bar: 1, baz: 2 },
		{ foo: 2, bar: 2, baz: 1 },
	];
	const result1 = groupArrayBy(array1, 'foo');
	const expected1 = new Map();
	expected1.set('1', [
		{ foo: 1, bar: 1, baz: 1 },
		{ foo: 1, bar: 1, baz: 2 },
		{ foo: 1, bar: 2, baz: 1 },
		{ foo: 1, bar: 2, baz: 2 },
		{ foo: 1, bar: 2, baz: 3 },
		{ foo: 1, bar: 3, baz: 1 },
	]);
	expected1.set('2', [
		{ foo: 2, bar: 1, baz: 1 },
		{ foo: 2, bar: 1, baz: 2 },
		{ foo: 2, bar: 2, baz: 1 },
	]);
	expect(result1).toStrictEqual(expected1);

	const result2 = groupArrayBy(array1, 'foo', 'bar');
	const expected2 = new Map();
	expected2.set('1-1', [
		{ foo: 1, bar: 1, baz: 1 },
		{ foo: 1, bar: 1, baz: 2 },
	]);
	expected2.set('1-2', [
		{ foo: 1, bar: 2, baz: 1 },
		{ foo: 1, bar: 2, baz: 2 },
		{ foo: 1, bar: 2, baz: 3 },
	]);
	expected2.set('1-3', [{ foo: 1, bar: 3, baz: 1 }]);
	expected2.set('2-1', [
		{ foo: 2, bar: 1, baz: 1 },
		{ foo: 2, bar: 1, baz: 2 },
	]);
	expected2.set('2-2', [{ foo: 2, bar: 2, baz: 1 }]);
	expect(result2).toStrictEqual(expected2);
});

test('testing objectToSearchParams', () => {
	const val = { a: '1', b: 'old', c: '3', d: 'new' };
	const result = objectToSearchParams(val);
	assertType<string>(result);
	expect(result).toBe('a=1&b=old&c=3&d=new');
});
