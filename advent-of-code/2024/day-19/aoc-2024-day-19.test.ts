import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day19, day19Path } from './aoc-2024-day-19.js';

test('testing aoc-2024-day-19 with sample ', async () => {
	const input = await readFile(path.join(day19Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day19(input);
	expect(res.count).toBe(6);
	expect(res.totalCount).toBe(16);
});

test('testing aoc-2024-day-19 with input ', async () => {
	const input = await readFile(path.join(day19Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day19(input);
	expect(res.count).toBe(209);
	expect(res.totalCount).toBe(777669668613191);
});
