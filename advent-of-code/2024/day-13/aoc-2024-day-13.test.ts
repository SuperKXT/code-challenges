import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day13, day13Path } from './aoc-2024-day-13.js';

test('testing aoc-2024-day-13 with sample ', async () => {
	const input = await readFile(path.join(day13Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day13(input);
	expect(res.tokens).toBe(480);
	expect(res.adjustedTokens).toBe(875318608908);
});

test('testing aoc-2024-day-13 with input ', async () => {
	const input = await readFile(path.join(day13Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day13(input);
	expect(res.tokens).toBe(31761);
	expect(res.adjustedTokens).toBe(90798500745591);
});
