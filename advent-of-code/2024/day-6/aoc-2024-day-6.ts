type TDirection = '^' | '>' | 'v' | '<';

const nextMap: Record<TDirection, TDirection> = {
	'^': '>',
	'>': 'v',
	v: '<',
	'<': '^',
};

export const aoc2024Day6 = (input: string) => {
	const grid: string[][] = [];
	let direction = '^' as TDirection;
	let coords = { x: 0, y: 0 };
	let count = 0;
	let rowIdx = 0;
	for (const row of input.split('\n')) {
		if (!row.trim()) continue;
		const startIdx = row.indexOf('^');
		if (startIdx !== -1) {
			coords.x = rowIdx;
			coords.y = startIdx;
		}
		grid.push(row.trim().split(''));
		rowIdx++;
	}
	while (true) {
		const row = grid[coords.x];
		if (!row) break;
		const cell = row[coords.y];
		if (!cell) break;
		else if (cell !== 'X') {
			count++;
			row[coords.y] = 'X';
		}
		const nextCoords = { ...coords };
		if (direction === '^') nextCoords.x--;
		else if (direction === '>') nextCoords.y++;
		else if (direction === 'v') nextCoords.x++;
		else nextCoords.y--;
		const next = grid[nextCoords.x]?.[nextCoords.y];
		if (!next) break;
		if (next === '#') {
			direction = nextMap[direction];
		} else {
			coords = nextCoords;
		}
	}
	return { count };
};
