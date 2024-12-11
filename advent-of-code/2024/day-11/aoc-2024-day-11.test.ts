import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day11, day11Path } from './aoc-2024-day-11.js';

test('testing aoc-2024-day-11 with sample ', async () => {
	const input = await readFile(path.join(day11Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day11(input);
	expect(res.count).toBe(55312);
});

test('testing aoc-2024-day-11 with input ', async () => {
	const input = await readFile(path.join(day11Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day11(input);
	expect(res.count).toBe(228668);
});
