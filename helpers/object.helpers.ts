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

export const pick = <Type extends Obj, ToPick extends keyof Type>(
	obj: Type,
	...keys: ToPick[]
): Utils.prettify<Pick<Type, ToPick>> => {
	const picked = {} as Utils.prettify<Pick<Type, ToPick>>;
	for (const key of keys) if (key in obj) picked[key] = obj[key];
	return picked;
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
