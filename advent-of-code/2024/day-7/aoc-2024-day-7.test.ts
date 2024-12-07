import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day7, day7Path } from './aoc-2024-day-7.js';

test('testing aoc-2024-day-7 with sample ', async () => {
	const input = await readFile(path.join(day7Path, 'sample.txt'), 'utf-8');
	const res = aoc2024Day7(input);
	expect(res.sumAndProdCount).toBe(3749);
});

test('testing aoc-2024-day-7 with input ', async () => {
	const input = await readFile(path.join(day7Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day7(input);
	expect(res.sumAndProdCount).toBe(465126289353);
	expect(res.totalCount).toBe(70597497486371);
});
