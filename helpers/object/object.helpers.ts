export const objectEntries = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.entries(object) as [Keys, Type][];

export const objectKeys = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.keys(object) as Keys[];

export const objectValues = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.values<Type>(object);

export const omit = <Key extends string, Type extends Record<Key, unknown>>(
	object: Type,
	keys: Key | Key[]
): Prettify<Omit<Type, Key>> => {
	const keyArray = Array.isArray(keys) ? keys : [keys];
	return objectEntries(object).reduce<Omit<Type, Key>>((obj, [key, value]) => {
		if (keyArray.includes(key)) return obj;
		return { ...obj, [key]: value };
	}, {} as Omit<Type, Key>);
};

export const pick = <Key extends string, Type extends Record<Key, unknown>>(
	object: Type,
	keys: Key | Key[]
): Prettify<Pick<Type, Key>> => {
	const keyArray = Array.isArray(keys) ? keys : [keys];
	return objectEntries(object).reduce<Pick<Type, Key>>((obj, [key, value]) => {
		if (!keyArray.includes(key)) return obj;
		return { ...obj, [key]: value };
	}, {} as Pick<Type, Key>);
};
