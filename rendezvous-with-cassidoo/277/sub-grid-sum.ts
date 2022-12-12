export const subGridSum = (
	grid: number[][],
	marks: [number, number, number, number]
): number => {

	const subGrid: number[][] = [];

	for (let row = 0; row < grid.length; row++) {
		const cells = grid[row] as number[];
		const cols = cells.reduce(
			(coords: number[], cell, col) => (
				marks.includes(cell)
					? [...coords, col]
					: coords
			)
			, []
		);
		if (cols.length < 2) continue;
		for (const col of cols) {
			const [left, right] = cells.slice(col, col + 1);
			if (!left || !right) continue;
			const matched = subGrid.slice(row).find(cells =>
				marks.includes(cells[left] as number)
				&& marks.includes(cells[right] as number)
			);
			if (!matched) continue;
			return grid
				.slice(row, grid.indexOf(matched) + 1)
				.flatMap(row => row.slice(left, right + 1))
				.reduce((sum, cell) => sum + cell, 0);
		}
	}

	throw new Error('No rectangle found!');

};
