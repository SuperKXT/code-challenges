import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day24, day24Path } from './aoc-2024-day-24.js';

test('testing aoc-2024-day-24 with sample ', async () => {
	const input = await readFile(path.join(day24Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day24(input);
	expect(res.output).toBe(2024);
});

test('testing aoc-2024-day-24 with input ', async () => {
	const input = await readFile(path.join(day24Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day24(input);
	expect(res.output).toBe(1358);
});
