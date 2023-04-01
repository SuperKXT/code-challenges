export const readableTypeOf = (value: any) => {
	if (typeof value !== 'object') return typeof value;
	if (value === null) return 'null';
	if (Array.isArray(value)) return 'array';
	return 'object';
};

export const isObject = (value: any): value is GenericObject =>
	readableTypeOf(value) === 'object';

export const assertObject: AssertFunction<GenericObject> = (value) => {
	const type = readableTypeOf(value);
	if (type !== 'object')
		throw new TypeError(`Expected object, received ${type}`);
};

export const isArray = <Type = unknown>(
	value: any,
	checker?: (value: any) => value is Type
): value is Type[] => {
	return Array.isArray(value) && (!checker || value.every(checker));
};

type AssertArray = <Type = unknown>(
	value: any,
	checker?: AssertFunction<Type>
) => asserts value is Type[];

export const assertArray: AssertArray = (value, checker) => {
	if (!Array.isArray(value))
		throw new TypeError(`Expected array, received ${readableTypeOf(value)}`);
	try {
		if (!value.length || !checker) return;
		value.forEach(checker);
	} catch (error: any) {
		throw new TypeError(`Invalid array member. ${error.message}`);
	}
};
