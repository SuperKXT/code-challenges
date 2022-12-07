export const objectEntries = <
	Keys extends PropertyKey,
	Type extends any
>(
	object: Record<Keys, Type>
) => Object.entries(object) as [Keys, Type][];

export const objectKeys = <
	Keys extends PropertyKey,
	Type extends any
>(
	object: Record<Keys, Type>
) => Object.keys(object) as Keys[];

export const objectValues = <
	Keys extends PropertyKey,
	Type extends any
>(
	object: Record<Keys, Type>
) => Object.values(object) as Type[];
