import { readFile } from 'fs/promises';
import path from 'path';

import { supplyStacks } from './supply-stacks';

const input = [
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

describe('testing supplyStacks', () => {
	it('should return the correct solution for the example input', async () => {
		const response = await supplyStacks(input);
		const solution: Solution = {
			part1: 'CMZ',
			part2: 'MCD',
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(
			path.join(__dirname, 'input.txt'),
			'utf-8'
		);
		const response = await supplyStacks(input);
		const solution: Solution = {
			part1: 'VRWBSFZWM', /* cSpell: disable-line */
			part2: 'RBTWJWMCF', /* cSpell: disable-line */
		};
		expect(response).toStrictEqual(solution);
	});
});
