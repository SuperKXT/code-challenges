import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '../../../config.js';

export const day16Path = path.join(
	config.dirname,
	'advent-of-code',
	'2024',
	'day-16',
);

const cellEnum = {
	empty: '.',
	wall: '#',
	start: 'S',
	goal: 'E',
} as const;

type TCell = (typeof cellEnum)[keyof typeof cellEnum];
type TGridRow = TCell[];
type TGrid = TGridRow[];

type TPos = [number, number];

const directionEnum = {
	up: '^',
	down: 'v',
	left: '<',
	right: '>',
} as const;

type TDirection = (typeof directionEnum)[keyof typeof directionEnum];

const rotateObj: Record<'left' | 'right', Record<TDirection, TDirection>> = {
	left: {
		[directionEnum.up]: directionEnum.left,
		[directionEnum.left]: directionEnum.down,
		[directionEnum.down]: directionEnum.right,
		[directionEnum.right]: directionEnum.up,
	},
	right: {
		[directionEnum.up]: directionEnum.right,
		[directionEnum.right]: directionEnum.down,
		[directionEnum.down]: directionEnum.left,
		[directionEnum.left]: directionEnum.up,
	},
};

const rotate = (direction: TDirection, type: 'left' | 'right'): TDirection => {
	return rotateObj[type][direction];
};

const getNext = (pos: TPos, direction: TDirection): TPos => {
	return [
		direction === directionEnum.up
			? pos[0] - 1
			: direction === directionEnum.down
				? pos[0] + 1
				: pos[0],
		direction === directionEnum.left
			? pos[1] - 1
			: direction === directionEnum.right
				? pos[1] + 1
				: pos[1],
	];
};

const getPaths = (
	grid: TGrid,
	pos: TPos,
	direction: TDirection = directionEnum.up,
	cost: number = 0,
): number[] => {
	const curr = grid[pos[0]]?.[pos[1]];

	if (!curr || curr === cellEnum.wall) return [];
	if (curr === cellEnum.goal) return [cost];

	const costs: number[] = [];

	const next = getNext(pos, direction);
	costs.push(...getPaths(grid, next, direction, cost + 1));

	const counter = rotate(direction, 'left');
	costs.push(...getPaths(grid, getNext(pos, counter), counter, cost + 100));

	const clockwise = rotate(direction, 'right');
	costs.push(...getPaths(grid, getNext(pos, clockwise), clockwise, cost + 100));

	return costs;
};

export const aoc2024Day16 = (input: string) => {
	const grid: TGrid = input
		.trim()
		.split('\n')
		.map((row) =>
			row
				.trim()
				.split('')
				.filter(
					(r) =>
						r === cellEnum.empty ||
						r === cellEnum.goal ||
						r === cellEnum.start ||
						r === cellEnum.wall,
				),
		);
	const rows = input.trim().split('\n');
	const start: TPos = [0, 0];
	for (let y = 0; y < rows.length; y++) {
		const curr = rows[y]?.trim() ?? '';
		if (!curr) continue;
		const row: TGridRow = [];
		grid.push(row);
		for (let x = 0; x < curr.length; x++) {
			const s = curr[x];
			if (
				s !== cellEnum.empty &&
				s !== cellEnum.goal &&
				s !== cellEnum.start &&
				s !== cellEnum.wall
			)
				throw new Error(`Invalid input`);
			if (s === cellEnum.start) {
				start[0] = y;
				start[1] = x;
			}
			row.push(s);
		}
	}

	const paths = getPaths(grid, start);
	console.log({ paths });
	let cost = Infinity;
	for (const p of paths) {
		cost = Math.min(cost, p);
	}

	return { cost };
};

if (!config.isTest) {
	console.time('aoc-2024-day-16');
	const input = await readFile(path.join(day16Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day16(input);
	console.info(res);
	console.timeEnd('aoc-2024-day-16');
}
