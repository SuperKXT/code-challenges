export const subGridSumError = 'No rectangle found!';

export const subGridSum = (
	grid: number[][],
	marks: [number, number, number, number]
): number => {
	for (let row = 0; row < grid.length; row++) {
		const rowCells = grid[row] as number[];
		const cols = rowCells.reduce(
			(cols: number[], cell, col) => (
				marks.includes(cell)
					? [...cols, col]
					: cols
			)
			, []
		);
		for (const left of cols) {
			const rest = cols.slice(cols.indexOf(left) + 1);
			for (const right of rest) {
				const otherTwo = marks.filter(mark =>
					![left, right].includes(mark)
				);
				const matched = grid.slice(row + 1).find(cells =>
					otherTwo.includes(cells[left] as number)
					&& otherTwo.includes(cells[right] as number)
				);
				if (!matched) continue;
				return grid
					.slice(row, grid.indexOf(matched) + 1)
					.flatMap(row => row.slice(left, right + 1))
					.reduce((sum, cell) => sum + cell, 0);
			}
		}
	}

	throw new Error(subGridSumError);
};
