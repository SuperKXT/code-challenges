import type { Utils } from "../types/utils.types.js";

export const readableTypeOf = (value: unknown) => {
	if (typeof value !== "object") return typeof value;
	if (value === null) return "null";
	if (Array.isArray(value)) return "array";
	return "object";
};

export function assert(val: unknown, error?: string): asserts val {
	if (!val) throw new Error(error ?? "assertion failed");
}

export const isObject = (value: unknown): value is object =>
	readableTypeOf(value) === "object";

export const assertObject: Utils.assertFunction<object> = (value) => {
	assert(isObject(value), `Expected object, received ${readableTypeOf(value)}`);
};

export const isArray = <Type = unknown>(
	value: unknown,
	checker?: (value: unknown) => value is Type,
): value is Type[] => {
	return Array.isArray(value) && (!checker || value.every(checker));
};

export function assertArray<Type = unknown>(
	value: unknown,
	checker?: (value: unknown) => value is Type,
): asserts value is Type[] {
	if (!isArray(value, checker)) throw new TypeError("Invalid array type");
}
