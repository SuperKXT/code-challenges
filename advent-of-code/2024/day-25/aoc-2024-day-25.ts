import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day25Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-25",
);

type TParsedGrid = { height: number; cols: number[] };

const parseGrid = (
	grid: string,
): { type: "lock" | "key"; data: TParsedGrid } => {
	const rows = grid.trim().split("\n").filter(Boolean);
	const height = rows.length - 2;
	const cols: number[] = [];
	const type = rows[0]?.startsWith("#") ? "lock" : "key";

	for (const row of rows.slice(1, rows.length - 1)) {
		for (let i = 0; i < row.length; i++) {
			cols[i] = (cols[i] ?? 0) + (row[i] === "#" ? 1 : 0);
		}
	}

	return { type, data: { height, cols } };
};

export const aoc2024Day24 = (input: string) => {
	const keys: TParsedGrid[] = [];
	const locks: TParsedGrid[] = [];
	const grids = input.trim().split("\n\n").filter(Boolean);
	for (const grid of grids) {
		const parsed = parseGrid(grid);
		if (parsed.type === "lock") locks.push(parsed.data);
		else keys.push(parsed.data);
	}

	let matches = 0;
	for (const lock of locks) {
		key: for (const key of keys) {
			for (let i = 0; i < lock.cols.length; i++) {
				if (
					(key.cols[i] ?? Infinity) + (lock.cols[i] ?? Infinity) >
					lock.height
				)
					continue key;
			}
			matches++;
		}
	}

	return { matches };
};

if (!config.isTest) {
	console.time("aoc-2024-day-25");
	const input = await readFile(path.join(day25Path, "sample.txt"), "utf-8");
	const res = aoc2024Day24(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-25");
}
