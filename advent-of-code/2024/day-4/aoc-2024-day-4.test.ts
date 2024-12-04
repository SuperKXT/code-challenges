import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day4 } from './aoc-2024-day-4.js';

import { config } from '../../../config.js';

const dirname = path.join(config.dirname, 'advent-of-code', '2024', 'day-4');

test('testing aoc-2024-day-4', async () => {
	const sample = await readFile(path.join(dirname, 'sample.txt'), 'utf-8');
	const sampleRes = aoc2024Day4(sample);
	expect(sampleRes.xmasCount).toBe(18);
	expect(sampleRes.x_masCount).toBe(9);

	const input = await readFile(path.join(dirname, 'input.txt'), 'utf-8');
	const response = aoc2024Day4(input);
	expect(response.xmasCount).toBe(2521);
	expect(response.x_masCount).toBe(1912);
});
