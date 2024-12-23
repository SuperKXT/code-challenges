import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day23, day23Path } from './aoc-2024-day-23.js';

test('testing aoc-2024-day-23 with sample ', async () => {
	const input = await readFile(path.join(day23Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day23(input);
	expect(res.connections).toBe(7);
});

test('testing aoc-2024-day-23 with input ', async () => {
	const input = await readFile(path.join(day23Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day23(input);
	expect(res.connections).toBe(1358);
});
