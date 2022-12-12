interface Solution {
	fewestSteps: number,
	part2: number,
}

type Direction = (
	| '.'
	| '<'
	| '>'
	| '^'
	| 'v'
);

export const pathfinder = (
	input: string
): Solution => {

	const solution: Solution = {
		fewestSteps: 0,
		part2: 0,
	};

	let startRow = -1;
	let startCol = -1;
	let endRow = -1;
	let endCol = -1;

	const grid = input.split('\n').map((line, row) => {
		const cells = Array.from(
			line,
			char => (
				char === 'S'
					? 'a'.charCodeAt(0) - 1
					: char === 'E'
						? 'z'.charCodeAt(0) + 1
						: char.charCodeAt(0)
			)
		);
		if (startRow === -1) {
			const col = line.indexOf('S');
			if (col !== -1) {
				startRow = row;
				startCol = col;
			}
		}
		if (endRow === -1) {
			const col = line.indexOf('E');
			if (col !== -1) {
				endRow = row;
				endCol = col;
			}
		}
		return cells;
	});

	const moves = grid.map(row =>
		Array.from('.'.repeat(row.length)) as Direction[]
	);

	return solution;

};
