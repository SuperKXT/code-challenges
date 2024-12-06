import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day6 } from './aoc-2024-day-6.js';

import { config } from '../../../config.js';

const dirname = path.join(config.dirname, 'advent-of-code', '2024', 'day-6');

test('testing aoc-2024-day-6', async () => {
	const sample = await readFile(path.join(dirname, 'sample.txt'), 'utf-8');
	const sampleRes = aoc2024Day6(sample);
	expect(sampleRes.count).toBe(41);

	const input = await readFile(path.join(dirname, 'input.txt'), 'utf-8');
	const response = aoc2024Day6(input);
	expect(response.count).toBe(5516);
});
