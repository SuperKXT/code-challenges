import { readFile } from 'fs/promises';
import path from 'path';

import { ropeBridge } from './rope-bridge';

const example = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'].join(
	'\n'
);

const example2 = [
	'R 5',
	'U 8',
	'L 8',
	'D 3',
	'R 17',
	'D 10',
	'L 25',
	'U 20',
].join('\n');

type Solution = ReturnType<typeof ropeBridge>;

describe('testing ropeBridge', () => {
	it('should return the correct solution for example test', () => {
		const response = ropeBridge(example, {
			row: 4,
			col: 0,
		});
		const solution: Solution = {
			firstTail: 13,
			lastTail: 1,
		};
		expect(response).toStrictEqual(solution);
	});
	it('should return the correct solution for the 2nd example test', () => {
		const solution: Solution = {
			firstTail: 88,
			lastTail: 36,
		};
		expect(ropeBridge(example2)).toStrictEqual(solution);
	});
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');
		const solution: Solution = {
			firstTail: 5902,
			lastTail: 2445,
		};
		expect(ropeBridge(input)).toStrictEqual(solution);
	});
});
