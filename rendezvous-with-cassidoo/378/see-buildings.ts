type SeeBuildings<Buildings extends number[]> = number;

export const seeBuildings = <const Buildings extends [number, ...number[]]>(
	buildings: Buildings,
): SeeBuildings<Buildings> => {
	let count = 0;
	for (let idx = 0; idx < buildings.length; idx++) {
		const curr = buildings[idx] as number;
		const next = buildings[idx + 1] ?? Infinity;
		count++;
		if (next < curr) break;
	}
	return count as never;
};
