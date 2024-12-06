import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '../../../config.js';

const directionEnum = {
	up: '^',
	right: '>',
	down: 'v',
	left: '<',
} as const;
type TDirection = (typeof directionEnum)[keyof typeof directionEnum];

const cellEnum = {
	obstruction: '#',
	empty: '.',
	visited: 'X',
	...directionEnum,
} as const;

type TCell = (typeof cellEnum)[keyof typeof cellEnum];
type TGrid = TCell[][];

const nextMap: Record<TDirection, TDirection> = {
	'^': '>',
	'>': 'v',
	v: '<',
	'<': '^',
};

const walkGrid = (grid: TGrid, start: { x: number; y: number }) => {
	const walked = grid.map((r) => [...r]);
	let direction = cellEnum.up as TDirection;
	let coords = { ...start };
	let count = 0;
	const walkSet = new Set<string>();
	while (true) {
		const row = walked[coords.x];
		if (!row) break;
		const cell = row[coords.y];
		if (!cell) break;
		else if (cell !== cellEnum.visited) {
			count++;
			row[coords.y] = cellEnum.visited;
		}

		const currWalk = `x:${coords.x},y:${coords.y},direction:${direction}`;
		if (walkSet.has(currWalk)) throw new Error('loop');
		else walkSet.add(currWalk);

		const nextCoords = { ...coords };
		if (direction === cellEnum.up) nextCoords.x--;
		else if (direction === cellEnum.right) nextCoords.y++;
		else if (direction === cellEnum.down) nextCoords.x++;
		else nextCoords.y--;
		const next = walked[nextCoords.x]?.[nextCoords.y];
		if (!next) break;
		if (next === cellEnum.obstruction) {
			direction = nextMap[direction];
		} else {
			coords = nextCoords;
		}
	}
	return { count, walked };
};

export const aoc2024Day6 = async (input: string) => {
	const grid: TGrid = [];
	const coords = { x: 0, y: 0 };
	let rowIdx = 0;
	for (const row of input.split('\n')) {
		if (!row.trim()) continue;
		const startIdx = row.indexOf('^');
		if (startIdx !== -1) {
			coords.x = rowIdx;
			coords.y = startIdx;
		}
		grid.push(row.trim().split('') as TCell[]);
		rowIdx++;
	}

	const { count } = walkGrid(grid, coords);

	const candidateGrids: TGrid[] = [];
	for (let x = 0; x < grid.length; x++) {
		const row = grid[x];
		if (!row) continue;
		for (let y = 0; y < row.length; y++) {
			const curr = row[y];
			if (curr !== cellEnum.empty) continue;
			const candidate = grid.map((r, xI) =>
				r.map((c, yI) => (xI === x && yI === y ? cellEnum.obstruction : c)),
			);
			candidateGrids.push(candidate);
		}
	}
	let obstructionCount = 0;
	await Promise.all(
		candidateGrids.map((c) => {
			try {
				walkGrid(c, coords);
				return undefined;
			} catch {
				obstructionCount++;
				return undefined;
			}
		}),
	);

	return { count, obstructionCount };
};

if (!config.isTest) {
	const sample = await readFile(
		path.join(config.dirname, 'advent-of-code', '2024', 'day-6', 'sample.txt'),
		'utf-8',
	);
	const res = await aoc2024Day6(sample);
	console.info(res);
}
