import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day16Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-16",
);

const cellEnum = {
	empty: ".",
	wall: "#",
	start: "S",
	goal: "E",
} as const;

type TCell = (typeof cellEnum)[keyof typeof cellEnum];
type TGridRow = TCell[];
type TGrid = TGridRow[];

type TPos = [number, number];

const directionEnum = {
	up: "^",
	down: "v",
	left: "<",
	right: ">",
} as const;

type TDirection = (typeof directionEnum)[keyof typeof directionEnum];

const rotateObj: Record<TRotate, Record<TDirection, TDirection>> = {
	counter: {
		[directionEnum.up]: directionEnum.left,
		[directionEnum.left]: directionEnum.down,
		[directionEnum.down]: directionEnum.right,
		[directionEnum.right]: directionEnum.up,
	},
	clockwise: {
		[directionEnum.up]: directionEnum.right,
		[directionEnum.right]: directionEnum.down,
		[directionEnum.down]: directionEnum.left,
		[directionEnum.left]: directionEnum.up,
	},
};

type TRotate = "counter" | "clockwise";

const rotate = (direction: TDirection, type: TRotate): TDirection => {
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

type TPath = Map<string, TDirection>;

type TPathRes = { cost: number; path: TPath }[];

const getPaths = (
	grid: TGrid,
	pos: TPos,
	direction: TDirection = directionEnum.right,
	run: TPathRes[number] = { cost: 0, path: new Map() },
): TPathRes => {
	const curr = grid[pos[0]]?.[pos[1]];

	if (!curr || curr === cellEnum.wall) return [];
	if (curr === cellEnum.goal) return [run];

	const key = `${pos[0]}-${pos[1]}`;
	if (run.path.has(key)) return [];
	run.path.set(key, direction);

	const res: TPathRes = [];

	const next = getNext(pos, direction);
	const counterDir = rotate(direction, "counter");
	const counterPos = getNext(pos, counterDir);
	const clockwiseDir = rotate(direction, "clockwise");
	const clockwisePos = getNext(pos, clockwiseDir);

	res.push(
		...getPaths(grid, next, direction, {
			cost: run.cost + 1,
			path: new Map(run.path),
		}),
	);
	res.push(
		...getPaths(grid, counterPos, counterDir, {
			cost: run.cost + 1001,
			path: new Map(run.path),
		}),
	);
	res.push(
		...getPaths(grid, clockwisePos, clockwiseDir, {
			cost: run.cost + 1001,
			path: new Map(run.path),
		}),
	);

	return res;
};

export const aoc2024Day16 = (input: string) => {
	const grid: TGrid = [];
	const rows = input.trim().split("\n");
	const start: TPos = [0, 0];
	for (let y = 0; y < rows.length; y++) {
		const curr = rows[y]?.trim() ?? "";
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

	// console.log(grid.map((r) => r.join('')).join('\n'));

	const paths = getPaths(grid, start);
	let cost = Infinity;
	for (const p of paths) {
		cost = Math.min(cost, p.cost);
		// const pathStr = grid
		// 	.map((row, y) =>
		// 		row
		// 			.map((r, x) => {
		// 				const curr = p.path.get(`${y}-${x}`);
		// 				return curr ?? r;
		// 			})
		// 			.join(''),
		// 	)
		// 	.join('\n');
		// console.log(`Cost: ${p.cost}, Steps: ${p.path.size}`);
		// console.log(pathStr);
		// console.log();
	}

	return { cost };
};

if (!config.isTest) {
	console.time("aoc-2024-day-16");
	const input = await readFile(path.join(day16Path, "input.txt"), "utf-8");
	const res = aoc2024Day16(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-16");
}
