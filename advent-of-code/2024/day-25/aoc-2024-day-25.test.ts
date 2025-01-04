import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { aoc2024Day24, day25Path } from './aoc-2024-day-25.js';

test('testing aoc-2024-day-25 with sample ', async () => {
	const input = await readFile(path.join(day25Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day24(input);
	expect(res.matches).toBe(3);
});

test('testing aoc-2024-day-25 with input ', async () => {
	const input = await readFile(path.join(day25Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day24(input);
	expect(res.matches).toBe(3249);
});
