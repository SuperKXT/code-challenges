export const canPlantFlowers = (
	quantities: (0 | 1)[],
	quantity: number,
): boolean => {
	let remaining = quantity;
	for (let idx = 0; idx < quantities.length; idx++) {
		if (!remaining) break;
		const curr = quantities[idx];
		const last = quantities[idx - 1];
		const next = quantities[idx + 1];
		if (!curr && !last && !next) {
			remaining--;
			quantities[idx] = 1;
		}
	}
	return !remaining;
};
