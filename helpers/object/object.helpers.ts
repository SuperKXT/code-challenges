import type { Utils } from '~/types/utils';

export const objectEntries = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.entries(object) as [Keys, Type][];

export const objectKeys = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.keys(object) as Keys[];

export const objectValues = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.values<Type>(object);

export const omit = <
	Type extends Record<string, unknown>,
	Key extends keyof Type
>(
	object: Type,
	keys: Key | Key[]
): Utils.prettify<Omit<Type, Key>> => {
	const keySet = new Set<PropertyKey>(Array.isArray(keys) ? keys : [keys]);
	return Object.fromEntries(
		Object.entries(object).filter(([key]) => !keySet.has(key))
	) as Utils.prettify<Omit<Type, Key>>;
};

export const pick = <
	Type extends Record<string, unknown>,
	Key extends keyof Type
>(
	object: Type,
	keys: Key | Key[]
): Utils.prettify<Pick<Type, Key>> => {
	const keySet = new Set<PropertyKey>(Array.isArray(keys) ? keys : [keys]);
	return Object.fromEntries(
		Object.entries(object).filter(([key]) => keySet.has(key))
	) as Utils.prettify<Pick<Type, Key>>;
};
