import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day9, day9Path } from './aoc-2024-day-9.js';

test('testing aoc-2024-day-9 with sample ', async () => {
	const input = await readFile(path.join(day9Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day9(input);
	expect(res.checksum).toBe(1928);
});

test('testing aoc-2024-day-9 with input ', async () => {
	const input = await readFile(path.join(day9Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day9(input);
	expect(res.checksum).toBe(6341711060162);
});
