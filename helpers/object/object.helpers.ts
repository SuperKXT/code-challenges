export const objectEntries = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.entries(object) as [Keys, Type][];

export const objectKeys = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.keys(object) as Keys[];

export const objectValues = <Keys extends PropertyKey, Type>(
	object: Record<Keys, Type>
) => Object.values(object) as Type[];

export const omitKey = <Key extends string, Type extends Record<Key, unknown>>(
	object: Type,
	toOmit: Key | Key[]
): Omit<Type, Key> => {
	const toOmitArray = Array.isArray(toOmit) ? toOmit : [toOmit];
	const clone = objectEntries(object).reduce((object, [key, value]) => {
		if (toOmitArray.includes(key)) return object;
		return { ...object, [key]: value };
	}, {});
	return clone as any;
};
