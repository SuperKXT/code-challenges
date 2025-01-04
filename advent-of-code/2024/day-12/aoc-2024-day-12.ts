import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day12Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-12",
);

type TRegion = {
	char: string;
	area: number;
	perimeter: number;
	startX: number;
	endX: number;
	startY: number;
	endY: number;
	points: Set<string>;
	sides: Set<string>;
};

const findRegion = (
	grid: string[],
	regions: TRegion[],
	visited: Set<string>,
	x: number,
	y: number,
	passedRegion?: TRegion,
	// eslint-disable-next-line max-params
): void => {
	const char = grid[x]?.[y];
	if (!char) return;

	const coord = `${x}-${y}`;
	if (visited.has(coord)) return;
	visited.add(coord);

	let region = passedRegion;
	if (!region) {
		region = {
			char,
			area: 0,
			startX: x,
			endX: x,
			startY: y,
			endY: y,
			perimeter: 0,
			points: new Set(),
			sides: new Set(),
		};
		regions.push(region);
	}
	region.startX = Math.min(region.startX, x);
	region.endX = Math.max(region.endX, x);
	region.startY = Math.min(region.startY, y);
	region.endY = Math.max(region.endY, y);
	region.points.add(coord);
	region.area++;
	const left = grid[x]?.[y - 1];
	const right = grid[x]?.[y + 1];
	const top = grid[x - 1]?.[y];
	const bottom = grid[x + 1]?.[y];

	if (char !== left) region.sides.add(`left-${coord}`);
	if (char !== right) region.sides.add(`right-${coord}`);
	if (char !== top) region.sides.add(`top-${coord}`);
	if (char !== bottom) region.sides.add(`bottom-${coord}`);

	if (char !== left) region.perimeter++;
	else findRegion(grid, regions, visited, x, y - 1, region);

	if (char !== right) region.perimeter++;
	else findRegion(grid, regions, visited, x, y + 1, region);

	if (char !== top) region.perimeter++;
	else findRegion(grid, regions, visited, x - 1, y, region);

	if (char !== bottom) region.perimeter++;
	else findRegion(grid, regions, visited, x + 1, y, region);
};

export const aoc2024Day12 = (input: string) => {
	const rows = input.trim().split("\n");
	const visited = new Set<string>();
	const regions: TRegion[] = [];
	for (let x = 0; x < rows.length; x++) {
		const row = rows[x]?.trim();
		if (!row) continue;
		for (let y = 0; y < row.length; y++) {
			findRegion(rows, regions, visited, x, y);
		}
	}

	let cost = 0;
	let bulkCost = 0;
	for (const region of regions) {
		cost += region.area * region.perimeter;
		let sideCount = 0;
		for (let x = region.startX; x <= region.endX; x++) {
			for (let y = region.startY; y <= region.endY; y++) {
				const point = `${x}-${y}`;
				const isPoint = region.points.has(point);
				if (!isPoint) continue;
				for (const dir of ["left", "right", "top", "bottom"] as const) {
					const neighbors = {
						top: region.points.has(`${x - 1}-${y}`),
						bottom: region.points.has(`${x + 1}-${y}`),
						left: region.points.has(`${x}-${y - 1}`),
						right: region.points.has(`${x}-${y + 1}`),
					};
					if (neighbors[dir]) continue;
					const prevX = dir === "left" || dir === "right" ? x - 1 : x;
					const prevY = dir === "top" || dir === "bottom" ? y - 1 : y;
					const hasPrev = region.sides.has(`${dir}-${prevX}-${prevY}`);
					if (!hasPrev) sideCount++;
				}
			}
		}
		bulkCost += region.area * sideCount;
	}

	return { cost, bulkCost };
};

if (!config.isTest) {
	console.time("aoc-2024-day-12");
	const input = await readFile(path.join(day12Path, "input.txt"), "utf-8");
	const res = aoc2024Day12(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-12");
}
