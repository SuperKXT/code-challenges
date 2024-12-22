import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day22, day22Path } from './aoc-2024-day-22.js';

test('testing aoc-2024-day-22 with sample ', async () => {
	const input = await readFile(path.join(day22Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day22(input);
	expect(res.sum).toBe(37327623n);
	expect(res.highest).toBe(24);
});

test('testing aoc-2024-day-22 with input ', async () => {
	const input = await readFile(path.join(day22Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day22(input);
	expect(res.sum).toBe(15608699004n);
	expect(res.highest).toBe(1791);
});
