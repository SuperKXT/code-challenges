import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { aoc2024Day1 } from './aoc-2024-day-1.js';

import { config } from '../../../config.js';

const dirname = path.join(config.dirname, 'advent-of-code', '2024', 'day-1');

test('testing aoc-2024-day-1', async () => {
	const sample = await readFile(path.join(dirname, 'sample.txt'), 'utf-8');
	const sampleRes = aoc2024Day1(sample);
	expect(sampleRes.distance).toBe(11);
	expect(sampleRes.similarity).toBe(31);

	const input = await readFile(path.join(dirname, 'input.txt'), 'utf-8');
	const response = aoc2024Day1(input);
	expect(response.distance).toBe(2815556);
	expect(response.similarity).toBe(23927637);
});
