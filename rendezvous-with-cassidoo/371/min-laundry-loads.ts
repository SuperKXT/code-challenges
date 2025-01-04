type Fabric = "normal" | "heavy" | "delicate";

type Item = [color: string, fabric: Fabric];

type ItemKey<T extends Item> =
	`${T[0]}-${T[1] extends "delicate" ? "delicate" : "mixed"}`;

type MinLaundryLoads<
	Items extends Item[],
	Count extends 1[] = [],
	Existing extends Record<string, 1> = {},
> = Items extends [infer first extends Item, ...infer rest extends Item[]]
	? ItemKey<first> extends keyof Existing
		? MinLaundryLoads<rest, Count, Existing>
		: MinLaundryLoads<rest, [...Count, 1], Existing & Record<ItemKey<first>, 1>>
	: Count["length"];

export const minLaundryLoads = <const Items extends [Item, ...Item[]]>(
	items: Items,
): MinLaundryLoads<Items> => {
	const colorSet = new Set<string>();
	for (const [color, fabric] of items) {
		const key = `${color}-${fabric === "delicate" ? "delicate" : "mixed"}`;
		colorSet.add(key);
	}
	return colorSet.size as never;
};
