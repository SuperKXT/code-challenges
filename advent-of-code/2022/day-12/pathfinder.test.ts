import { readFile } from 'fs/promises';
import path from 'path';

import { pathfinder } from './pathfinder';

/** cSpell: disable */
const example = [
	'Sabqponm',
	'abcryxxl',
	'accszExk',
	'acctuvwj',
	'abdefghi',
].join('\n');
/** cSpell: enable */

type Solution = ReturnType<typeof pathfinder>;

describe('testing pathfinder', () => {
	it('should return the correct solution for example test', () => {
		const response = pathfinder(example);
		const solution: Solution = {
			fewestSteps: 0,
			part2: 0,
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');
		const solution: Solution = {
			fewestSteps: 0,
			part2: 0,
		};
		expect(pathfinder(input)).toStrictEqual(solution);
	});
});
