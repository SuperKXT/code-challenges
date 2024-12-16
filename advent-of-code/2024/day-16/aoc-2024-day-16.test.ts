import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day16, day16Path } from './aoc-2024-day-16.js';

test('testing aoc-2024-day-16 with sample ', async () => {
	const input = await readFile(path.join(day16Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day16(input);
	expect(res.cost).toBe(7036);
});

test.skip('testing aoc-2024-day-16 with input ', async () => {
	const input = await readFile(path.join(day16Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day16(input);
	expect(res.cost).toBe(1430439);
});
