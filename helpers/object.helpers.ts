import { isObject } from './type.helpers.js';

import type { Utils } from '../types/utils.types.js';

export const objectEntries = <T extends Obj>(
	object: T,
): [keyof T, T[keyof T]][] => {
	return Object.entries(object) as never;
};

export const objectKeys = <T extends Obj>(object: T): (keyof T)[] => {
	return Object.keys(object);
};

export const objectValues = <T extends Obj>(object: T): T[keyof T][] => {
	return Object.values(object) as never;
};

export const omit = <Type extends Obj, ToOmit extends keyof Type>(
	object: Type,
	keys: ToOmit | ToOmit[],
): Utils.prettify<Omit<Type, ToOmit>> => {
	const keyArray = Array.isArray(keys) ? keys : [keys];
	const omitted = {} as Record<string, unknown>;
	for (const key in object) {
		if (!Object.hasOwn(object, key) || keyArray.includes(key)) continue;
		omitted[key] = object[key];
	}
	return omitted as Utils.prettify<Omit<Type, ToOmit>>;
};

export const pick = <Type extends Obj, ToPick extends keyof Type>(
	object: Type,
	keys: ToPick | ToPick[],
): Utils.prettify<Pick<Type, ToPick>> => {
	const keyArray = Array.isArray(keys) ? keys : [keys];
	const obj = {} as Utils.prettify<Pick<Type, ToPick>>;
	for (const key of keyArray) if (key in object) obj[key] = object[key];
	return obj;
};

export const deepMerge = <T extends Obj, U extends Obj>(
	first: T,
	second: U,
): Utils.deepMerge<T, U> => {
	const commonKeys = { ...first, ...second };
	const merged: Record<string, unknown> = {};
	for (const key of Object.keys(commonKeys)) {
		const firstCurr = first[key];
		const secondCurr = second[key];
		merged[key] =
			isObject(firstCurr) && isObject(secondCurr)
				? deepMerge(firstCurr, secondCurr)
				: secondCurr ?? firstCurr;
	}
	return merged as never;
};
