export const SUB_GRID_SUM_ERROR = new Error("No rectangle found!");

export const subGridSum = (
	grid: number[][],
	marks: [number, number, number, number],
): number => {
	for (let row = 0; row < grid.length; row++) {
		const rowCells = grid[row] as number[];
		const cols = rowCells.reduce<number[]>(
			(numbers, cell, col) =>
				marks.includes(cell) ? [...numbers, col] : numbers,
			[],
		);
		for (const left of cols) {
			const rest = cols.slice(cols.indexOf(left) + 1);
			for (const right of rest) {
				const otherTwo = marks.filter((mark) => ![left, right].includes(mark));
				const matched = grid
					.slice(row + 1)
					.find(
						(cells) =>
							otherTwo.includes(cells[left] as number) &&
							otherTwo.includes(cells[right] as number),
					);
				if (!matched) continue;

				return grid
					.slice(row, grid.indexOf(matched) + 1)
					.flatMap((curr) => curr.slice(left, right + 1))
					.reduce<number>((sum, cell) => sum + cell, 0);
			}
		}
	}

	throw SUB_GRID_SUM_ERROR;
};
