import { readFile } from 'fs/promises';
import path from 'path';

import { treeHouse } from './tree-house';

const example = [
	'30373',
	'25512',
	'65332',
	'33549',
	'35390',
].join('\n');

describe('testing raumdeuter', () => {
	it('should return the correct solution for example test', () => {
		expect(treeHouse(example)).toStrictEqual({
			visible: 21,
			scenicScore: 8,
		});
	});
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(
			path.join(__dirname, 'input.txt'),
			'utf-8'
		);
		expect(treeHouse(input)).toStrictEqual({
			visible: 1849,
			scenicScore: 201600,
		});
	});
});
