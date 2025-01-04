import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day10Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-10",
);

type TCoord = `${number},${number}`;

type TTrailResult = { summits: number; treks: number };

const walkTheTrail = (
	trail: number[][],
	x: number,
	y: number,
	trekked: Set<TCoord>,
): TTrailResult => {
	const curr = trail[x]?.[y];
	if (curr === undefined) throw new Error("invalid coordinates");
	if (curr === 9) {
		const res: TTrailResult = { summits: 0, treks: 0 };
		res.treks++;
		if (!trekked.has(`${x},${y}`)) {
			trekked.add(`${x},${y}`);
			res.summits++;
		}
		return res;
	}
	const options = [
		[x, y - 1], // left
		[x, y + 1], // right
		[x - 1, y], // up
		[x + 1, y], // down
	] as const;
	const res: TTrailResult = { summits: 0, treks: 0 };

	for (const op of options) {
		const next = trail[op[0]]?.[op[1]];
		if (next !== curr + 1) continue;
		const { treks, summits } = walkTheTrail(trail, op[0], op[1], trekked);
		res.treks += treks;
		res.summits += summits;
	}
	return res;
};

export const aoc2024Day10 = (input: string) => {
	const trails = new Map<
		TCoord,
		{ trekked: Set<TCoord>; x: number; y: number }
	>();
	const res: TTrailResult = { summits: 0, treks: 0 };

	const grid: number[][] = [];
	const rows = input.split("\n");
	for (let x = 0; x < rows.length; x++) {
		const row = rows[x]?.trim();
		if (!row) continue;
		const gridRow: number[] = [];
		grid.push(gridRow);
		for (let y = 0; y < row.length; y++) {
			const num = Number(row[y]);
			if (num === 0) trails.set(`${x},${y}`, { trekked: new Set(), x, y });
			gridRow.push(num);
		}
	}

	for (const [_coord, { trekked, x, y }] of trails) {
		const { summits, treks } = walkTheTrail(grid, x, y, trekked);
		res.summits += summits;
		res.treks += treks;
	}

	return res;
};

if (!config.isTest) {
	console.time("aoc-2024-day-10");
	const input = await readFile(path.join(day10Path, "input.txt"), "utf-8");
	const res = aoc2024Day10(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-10");
}
