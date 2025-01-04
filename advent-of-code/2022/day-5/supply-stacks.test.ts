import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { supplyStacks } from './supply-stacks.js';

import { config } from '../../../config.js';

const INPUT = [
	'    [D]    ',
	'[N] [C]    ',
	'[Z] [M] [P]',
	' 1  2  3',
	'',
	'move 1 from 2 to 1',
	'move 3 from 1 to 3',
	'move 2 from 2 to 1',
	'move 1 from 1 to 2',
].join('\n');

type Solution = Awaited<ReturnType<typeof supplyStacks>>;

test('testing supplyStacks against example input', () => {
	const response = supplyStacks(INPUT);
	const solution: Solution = {
		part1: 'CMZ',
		part2: 'MCD',
	};
	expect(response).toStrictEqual(solution);
});

test('testing supplyStacks against real input', async () => {
	const file = await readFile(path.join(config.dirname, 'input.txt'), 'utf-8');
	const response = supplyStacks(file);
	const solution: Solution = {
		/** cSpell: disable-next-line */
		part1: 'VRWBSFZWM',
		/** cSpell: disable-next-line */
		part2: 'RBTWJWMCF',
	};
	expect(response).toStrictEqual(solution);
});
