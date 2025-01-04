import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { aoc2024Day3 } from './aoc-2024-day-3.js';

import { config } from '../../../config.js';

const dirname = path.join(config.dirname, 'advent-of-code', '2024', 'day-3');

test('testing aoc-2024-day-3', async () => {
	const sample = await readFile(path.join(dirname, 'sample.txt'), 'utf-8');
	const sampleRes = aoc2024Day3(sample);
	expect(sampleRes.product).toBe(161);
	expect(sampleRes.adjustedProduct).toBe(48);

	const input = await readFile(path.join(dirname, 'input.txt'), 'utf-8');
	const response = aoc2024Day3(input);
	expect(response.product).toBe(184122457);
	expect(response.adjustedProduct).toBe(107862689);
});
