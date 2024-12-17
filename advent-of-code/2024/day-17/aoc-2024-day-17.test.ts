import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day17, day17Path } from './aoc-2024-day-17.js';

test('testing aoc-2024-day-17 with sample ', async () => {
	const input = await readFile(path.join(day17Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day17(input);
	expect(res.output).toBe('4,6,3,5,6,3,5,2,1,0');
});

test('testing aoc-2024-day-17 with input ', async () => {
	const input = await readFile(path.join(day17Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day17(input);
	expect(res.output).toBe('1,2,4,1,2,3,3,2,1');
});