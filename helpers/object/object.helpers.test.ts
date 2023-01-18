import { omitKey } from './object.helpers';

describe('testing omitKey', () => {
	it('should remove a single key from object', () => {
		const omitted = { a: 1 };
		const object = { ...omitted, b: 2 };
		expect(omitKey(object, 'b')).toStrictEqual(omitted);
	});
	it('should remove multiple keys from the object', () => {
		const omitted = { a: 1 };
		const object = { ...omitted, b: 2, c: 3 };
		expect(omitKey(object, ['b', 'c'])).toStrictEqual(omitted);
	});
});
