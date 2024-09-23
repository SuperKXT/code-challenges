type Fabric = 'normal' | 'heavy' | 'delicate';

type Item = [color: string, fabric: Fabric];

type MinLaundryLoads<
	Items extends Item[],
	Count extends 1[] = [],
	Existing extends Record<string, 1> = {},
> = number;

export const minLaundryLoads = <const Items extends [Item, ...Item[]]>(
	items: Items,
): MinLaundryLoads<Items> => {
	const colorSet = new Set<string>();
	for (const [color, fabric] of items) {
		const key = fabric === 'delicate' ? color : `${color}-mixed`;
		colorSet.add(key);
	}
	return colorSet.size;
};
