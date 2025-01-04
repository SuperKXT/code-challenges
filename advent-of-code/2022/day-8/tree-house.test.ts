import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { treeHouse } from './tree-house.js';

import { config } from '../../../config.js';

const EXAMPLE = ['30373', '25512', '65332', '33549', '35390'].join('\n');

test('testing treeHouse against example input', () => {
	expect(treeHouse(EXAMPLE)).toStrictEqual({
		scenicScore: 8,
		visible: 21,
	});
});

test('testing treeHouse against real input', async () => {
	const input = await readFile(path.join(config.dirname, 'input.txt'), 'utf-8');
	expect(treeHouse(input)).toStrictEqual({
		scenicScore: 201600,
		visible: 1849,
	});
});
