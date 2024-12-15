import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day15, day15Path } from './aoc-2024-day-15.js';

test('testing aoc-2024-day-15 with sample ', async () => {
	const input = await readFile(path.join(day15Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day15(input);
	expect(res.sum).toBe(10092);
});

test('testing aoc-2024-day-15 with sample-2 ', async () => {
	const input = await readFile(path.join(day15Path, 'sample-2.txt'), 'utf-8');
	const res = aoc2024Day15(input);
	expect(res.sum).toBe(2028);
});

test('testing aoc-2024-day-15 with input ', async () => {
	const input = await readFile(path.join(day15Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day15(input);
	expect(res.sum).toBe(1436703);
});
