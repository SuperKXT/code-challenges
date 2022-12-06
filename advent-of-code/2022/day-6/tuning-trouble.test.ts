import { readFile } from 'fs/promises';
import path from 'path';

import { tuningTrouble } from './tuning-trouble';

type Solution = ReturnType<typeof tuningTrouble>;

interface Test {
	input: string,
	output: Solution,
};

const tests: Test[] = [
	{
		input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', /** cSpell: disable-line */
		output: {
			part1: 7,
			part2: 0,
		},
	},
	{
		input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', /** cSpell: disable-line */
		output: {
			part1: 5,
			part2: 0,
		},
	},
	{
		input: 'nppdvjthqldpwncqszvftbrmjlhg', /** cSpell: disable-line */
		output: {
			part1: 6,
			part2: 0,
		},
	},
	{
		input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', /** cSpell: disable-line */
		output: {
			part1: 10,
			part2: 0,
		},
	},
	{
		input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', /** cSpell: disable-line */
		output: {
			part1: 11,
			part2: 0,
		},
	},
];


describe('testing supplyStacks', () => {
	it.each(tests)('should return the correct solution for example tests', ({ input, output }) => {
		expect(tuningTrouble(input)).toStrictEqual(output);
	});
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(
			path.join(__dirname, 'input.txt'),
			'utf-8'
		);
		const response = await tuningTrouble(input);
		const solution: Solution = {
			part1: 7,
			part2: 0,
		};
		expect(response).toStrictEqual(solution);
	});
});
