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
	toOmit: Key | Key[]
): Omit<Type, Key> => {
	const toOmitArray = Array.isArray(toOmit) ? toOmit : [toOmit];
	const clone = objectEntries(object).reduce((obj, [key, value]) => {
		if (toOmitArray.includes(key)) return obj;

		return { ...obj, [key]: value };
	}, {});
	return clone as Omit<Type, Key>;
};

export const pick = <Key extends string, Type extends Record<Key, unknown>>(
	object: Type,
	toOmit: Key | Key[]
) => {
	const toPickArray = Array.isArray(toOmit) ? toOmit : [toOmit];
	return objectEntries(object).reduce<Pick<Type, Key>>((obj, [key, value]) => {
		if (!toPickArray.includes(key)) return obj;
		return { ...obj, [key]: value };
	}, {} as Pick<Type, Key>);
};
