import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '~/config.js';

import { sandTetris } from './sand-tetris.js';

const EXAMPLE = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

type Solution = ReturnType<typeof sandTetris>;

test('testing sandTetris against example input', () => {
	const response = sandTetris(EXAMPLE);
	const solution: Solution = {
		part1: 24,
		part2: 93,
	};
	expect(response).toStrictEqual(solution);
});

test('testing sandTetris against real input', async () => {
	const input = (
		await readFile(path.join(config.dirname, 'input.txt'), 'utf-8')
	).slice(0, -1);
	const solution: Solution = {
		part1: 692,
		part2: 31706,
	};
	expect(sandTetris(input)).toStrictEqual(solution);
});
