import { readFile } from 'fs/promises';
import path from 'path';

import { compareLists } from './aoc-2024-day-1.js';

import { config } from '../../../config.js';

const dirname = path.join(config.dirname, 'advent-of-code', '2024', 'day-1');

test('testing aoc-2024-day-1', async () => {
	const sample = await readFile(path.join(dirname, 'sample.txt'), 'utf-8');
	const sampleRes = compareLists(sample);
	expect(sampleRes).toBe(11);

	const input = await readFile(path.join(dirname, 'input.txt'), 'utf-8');
	const response = compareLists(input);
	expect(response).toBe(2815556);
});
