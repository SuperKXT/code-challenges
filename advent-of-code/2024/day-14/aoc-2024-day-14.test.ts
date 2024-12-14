import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day14, day14Path } from './aoc-2024-day-14.js';

test('testing aoc-2024-day-14 with sample ', async () => {
	const input = await readFile(path.join(day14Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day14(input, 'sample');
	expect(res.safetyFactor).toBe(12);
});

test('testing aoc-2024-day-14 with input ', async () => {
	const input = await readFile(path.join(day14Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day14(input, 'input');
	expect(res.safetyFactor).toBe(228457125);
});
