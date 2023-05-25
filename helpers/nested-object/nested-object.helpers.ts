type UnionToIntersection<T> = (T extends T ? (x: T) => any : never) extends (
	x: infer U
) => any
	? U
	: never;

/* eslint-disable @typescript-eslint/ban-types */
type FlattenObject<
	T extends Record<string, unknown>,
	K extends keyof T = keyof T
> = Prettify<
	T &
		UnionToIntersection<
			K extends K
				? T[K] extends Record<string, unknown>
					? FlattenObject<T[K]>
					: {}
				: {}
		>
>;

const isObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const flattenObject = <T extends Record<string, unknown>>(
	curr: T
): FlattenObject<T> => {
	let mergedObj = curr;
	for (const value of Object.values(curr)) {
		if (!isObject(value)) continue;
		mergedObj = {
			...mergedObj,
			...flattenObject(value),
		};
	}
	return mergedObj as never;
};

export const getNestedKey = <
	T extends Record<string, unknown>,
	Flat extends FlattenObject<T>,
	K extends keyof Flat
>(
	obj: T,
	key: K
): Flat[K] => {
	const flatObj = flattenObject(obj) as Flat;
	return flatObj[key];
};
