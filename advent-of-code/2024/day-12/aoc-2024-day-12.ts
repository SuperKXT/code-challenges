import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '../../../config.js';

export const day12Path = path.join(
	config.dirname,
	'advent-of-code',
	'2024',
	'day-12',
);

type TRegion = { area: number; perimeter: number; coords: Set<string> };

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

	const coord = `${x},${y}`;
	if (visited.has(coord)) return;
	visited.add(coord);

	let region = passedRegion;
	if (!region) {
		region = { area: 0, perimeter: 0, coords: new Set() };
		regions.push(region);
	}

	region.area++;
	const left = grid[x]?.[y - 1];
	const right = grid[x]?.[y + 1];
	const top = grid[x - 1]?.[y];
	const bottom = grid[x + 1]?.[y];

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
	const rows = input.trim().split('\n');
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
	for (const region of regions) {
		cost += region.area * region.perimeter;
	}

	return { cost };
};

if (!config.isTest) {
	console.time('aoc-2024-day-12');
	const input = await readFile(path.join(day12Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day12(input);
	console.info(res);
	console.timeEnd('aoc-2024-day-12');
}
