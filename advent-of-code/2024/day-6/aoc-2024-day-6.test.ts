import { readFile } from 'fs/promises';
import path from 'path';

import { aoc2024Day6 } from './aoc-2024-day-6.js';

import { config } from '../../../config.js';

const dirname = path.join(config.dirname, 'advent-of-code', '2024', 'day-6');

test('testing aoc-2024-day-6 with sample ', async () => {
	const sample = await readFile(path.join(dirname, 'sample.txt'), 'utf-8');
	const sampleRes = await aoc2024Day6(sample);
	expect(sampleRes.count).toBe(41);
	expect(sampleRes.obstructionCount).toBe(6);
});

test('testing aoc-2024-day-6 with input ', async () => {
	const sample = await readFile(path.join(dirname, 'sample.txt'), 'utf-8');
	const sampleRes = await aoc2024Day6(sample);
	expect(sampleRes.count).toBe(41);
	expect(sampleRes.obstructionCount).toBe(6);
});
