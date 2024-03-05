import { isObject, readableTypeOf } from './type.helpers.js';

import type { Utils } from '../types/utils.types.js';

export const objectEntries = <T extends object>(
	object: T,
): [keyof T, T[keyof T]][] => {
	return Object.entries(object) as never;
};

export const objectKeys = <T extends object>(object: T): (keyof T)[] => {
	return Object.keys(object) as (keyof T)[];
};

export const objectValues = <T extends object>(object: T): T[keyof T][] => {
	return Object.values(object) as never;
};

export const omit = <Type extends object, ToOmit extends keyof Type>(
	obj: Type,
	...keys: ToOmit[]
): Utils.prettify<Omit<Type, ToOmit>> => {
	const omitted = {} as Record<string, unknown>;
	for (const key in obj) {
		if (!Object.hasOwn(obj, key) || keys.includes(key)) continue;
		omitted[key] = obj[key];
	}
	return omitted as Utils.prettify<Omit<Type, ToOmit>>;
};

export const pick = <Type extends object, ToPick extends keyof Type>(
	obj: Type,
	...keys: ToPick[]
): Utils.prettify<Pick<Type, ToPick>> => {
	const picked = {} as Utils.prettify<Pick<Type, ToPick>>;
	for (const key of keys) if (key in obj) picked[key] = obj[key];
	return picked;
};

export const deepMerge = <T extends object, U extends object>(
	first: T,
	second: U,
): Utils.deepMerge<T, U> => {
	const commonKeys = { ...first, ...second };
	const merged: Record<string, unknown> = {};
	for (const key of Object.keys(commonKeys)) {
		const firstCurr = first[key as never] as unknown;
		const secondCurr = second[key as never] as unknown;
		merged[key] =
			isObject(firstCurr) && isObject(secondCurr)
				? deepMerge(firstCurr, secondCurr)
				: secondCurr ?? firstCurr;
	}
	return merged as never;
};

export const objectToFormData = (obj: object) => {
	const formData = new FormData();
	for (const key in obj) {
		if (!Object.hasOwn(obj, key)) continue;
		const value = obj[key as never] as unknown;
		if (value instanceof File) {
			formData.append(key, value);
			continue;
		}
		const type = readableTypeOf(value);
		if (type === 'array') {
			for (const item of value as unknown[]) {
				const itemType = readableTypeOf(item);
				if (['object', 'array', 'symbol', 'function'].includes(itemType))
					throw new Error(
						`invalid value for '${key}': form data does not allow '${itemType}'`,
					);
				formData.append(key, String(item));
			}
		} else if (['object', 'symbol', 'function'].includes(type)) {
			throw new Error(
				`invalid value for '${key}': form data does not allow '${type}'`,
			);
		} else if (['undefined', 'null'].includes(type)) continue;
		else formData.append(key, String(value));
	}
	return formData;
};
