import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day14Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-14",
);

const regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/u;

const updateGrid = ({
	grid,
	rows,
	cols,
	robots,
}: {
	grid: number[][];
	rows: number;
	cols: number;
	robots: { p: { x: number; y: number }; v: { x: number; y: number } }[];
}) => {
	for (const r of robots) {
		const prevX = r.p.x;
		const prevY = r.p.y;
		if (grid[prevY]?.[prevX] !== undefined) grid[prevY][prevX] -= 1;

		const nX = r.p.x + r.v.x;
		const nextX = nX < 0 ? cols + nX : nX % cols;
		r.p.x = nextX;
		const nY = r.p.y + r.v.y;
		const nextY = nY < 0 ? rows + nY : nY % rows;
		r.p.y = nextY;
		if (grid[nextY]?.[nextX] !== undefined) grid[nextY][nextX] += 1;
	}
};

export const aoc2024Day14 = (input: string, type: "sample" | "input") => {
	const gridDimensions = {
		sample: { rows: 7, cols: 11 },
		input: { rows: 103, cols: 101 },
	};
	const rows = gridDimensions[type].rows;
	const cols = gridDimensions[type].cols;

	const grid = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => 0),
	);
	const robots = input
		.trim()
		.split("\n")
		.map((s) => {
			const lines = regex.exec(s.trim());
			const pX = parseInt(lines?.[1] ?? "");
			const pY = parseInt(lines?.[2] ?? "");
			const vX = parseInt(lines?.[3] ?? "");
			const vY = parseInt(lines?.[4] ?? "");
			if (isNaN(pX) || isNaN(pY) || isNaN(vX) || isNaN(vY))
				throw new Error(`Invalid coord string`);
			if (grid[pY]?.[pX] !== undefined) grid[pY][pX] += 1;
			return { p: { x: pX, y: pY }, v: { x: vX, y: vY } };
		});

	let s = 0;
	for (s = 0; s < 100; s++) {
		updateGrid({ grid, rows, cols, robots });
	}

	const quads = { 1: 0, 2: 0, 3: 0, 4: 0 };

	const halfRows = Math.floor(rows / 2);
	const halfCols = Math.floor(cols / 2);
	for (let y = 0; y < rows; y++) {
		if (y === halfRows) continue;
		for (let x = 0; x < cols; x++) {
			if (x === halfCols) continue;
			const quad = y < halfRows ? (x < halfCols ? 1 : 2) : x < halfCols ? 3 : 4;
			const count = grid[y]?.[x] ?? 0;
			quads[quad] += count;
		}
	}
	const safetyFactor = quads[1] * quads[2] * quads[3] * quads[4];

	let christmasTree = 0;
	if (type === "input") {
		for (s; s < 25_000; s++) {
			updateGrid({ grid, rows, cols, robots });
			const map = grid.map((row) => row.join("")).join("\n");
			const rx = /[^0]{30,}/u;
			if (!rx.test(map)) continue;
			christmasTree = s + 1;
			break;
		}
	}

	return { safetyFactor, christmasTree };
};

if (!config.isTest) {
	console.time("aoc-2024-day-14");
	const input = await readFile(path.join(day14Path, "input.txt"), "utf-8");
	const res = aoc2024Day14(input, "input");
	console.info(res);
	console.timeEnd("aoc-2024-day-14");
}
