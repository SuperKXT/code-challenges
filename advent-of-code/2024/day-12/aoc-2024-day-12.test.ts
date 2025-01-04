import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { aoc2024Day12, day12Path } from './aoc-2024-day-12.js';

test('testing aoc-2024-day-12 with sample ', async () => {
	const input = await readFile(path.join(day12Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day12(input);
	expect(res.cost).toBe(1930);
	expect(res.bulkCost).toBe(1206);
});

test('testing aoc-2024-day-12 with input ', async () => {
	const input = await readFile(path.join(day12Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day12(input);
	expect(res.cost).toBe(1573474);
	expect(res.bulkCost).toBe(966476);
});
