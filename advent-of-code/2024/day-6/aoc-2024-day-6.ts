import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

const directionEnum = {
	up: "^",
	right: ">",
	down: "v",
	left: "<",
} as const;

type TDirection = (typeof directionEnum)[keyof typeof directionEnum];

const cellEnum = {
	obstruction: "#",
	empty: ".",
	visited: "X",
	...directionEnum,
} as const;

export const nextMap: Record<TDirection, TDirection> = {
	"^": ">",
	">": "v",
	v: "<",
	"<": "^",
};

export const day6Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-6",
);

type TCell = (typeof cellEnum)[keyof typeof cellEnum];
type TGrid = TCell[][];

type TWalkGridArgs = { grid: TGrid; start: { x: number; y: number } };

type TWalkGridRes = { count: number; walked: TGrid };

const walkGrid = (args: TWalkGridArgs): TWalkGridRes => {
	const { grid, start } = args;
	const walked = grid.map((r) => [...r]);
	let direction = cellEnum.up as TDirection;
	let coords = { ...start };
	let count = 0;
	/** @type {Set<string>} */
	const walkSet = new Set();
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
		if (walkSet.has(currWalk)) throw new Error("loop");
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

export const aoc2024Day6 = (input: string) => {
	const grid: TGrid = [];
	const start = { x: 0, y: 0 };
	let rowIdx = 0;
	for (const row of input.split("\n")) {
		if (!row.trim()) continue;
		const startIdx = row.indexOf("^");
		if (startIdx !== -1) {
			start.x = rowIdx;
			start.y = startIdx;
		}
		grid.push(row.trim().split("") as TCell[]);
		rowIdx++;
	}

	const { count, walked } = walkGrid({ grid, start });

	let obstructionCount = 0;
	for (let x = 0; x < walked.length; x++) {
		const row = walked[x];
		if (!row) continue;
		for (let y = 0; y < row.length; y++) {
			const curr = row[y];
			if (curr !== cellEnum.visited) continue;
			const candidate = walked.map((r, xI) =>
				r.map((c, yI) => (xI === x && yI === y ? cellEnum.obstruction : c)),
			);
			try {
				walkGrid({ grid: candidate, start });
			} catch {
				obstructionCount++;
			}
		}
	}

	return { count, obstructionCount };
};

if (!config.isTest) {
	console.time("aoc-2024-day-6");
	const input = await readFile(path.join(day6Path, "input.txt"), "utf-8");
	const res = aoc2024Day6(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-6");
}
