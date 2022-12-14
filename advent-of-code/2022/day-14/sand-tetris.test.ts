import { readFile } from 'fs/promises';
import path from 'path';

import { sandTetris } from './sand-tetris';

const example = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

type Solution = ReturnType<typeof sandTetris>;

describe('testing sandTetris', () => {
	it('should return the correct solution for example test', () => {
		const response = sandTetris(example);
		const solution: Solution = {
			sands: 24,
			part2: 0,
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const input = (await readFile(
			path.join(__dirname, 'input.txt'),
			'utf-8'
		)).slice(0, -1);
		const solution: Solution = {
			sands: 692,
			part2: 0,
		};
		expect(sandTetris(input)).toStrictEqual(solution);
	});
});
