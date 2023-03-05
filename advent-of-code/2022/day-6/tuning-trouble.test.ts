import { readFile } from 'fs/promises';
import path from 'path';

import { tuningTrouble } from './tuning-trouble';

type Solution = ReturnType<typeof tuningTrouble>;

interface Test {
	input: string;
	output: Solution;
}

const TESTS: Test[] = [
	{
		/** cSpell: disable-next-line */
		input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
		output: {
			messageMarker: 19,
			packetMarker: 7,
		},
	},
	{
		/** cSpell: disable-next-line */
		input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
		output: {
			messageMarker: 23,
			packetMarker: 5,
		},
	},
	{
		/** cSpell: disable-next-line */
		input: 'nppdvjthqldpwncqszvftbrmjlhg',
		output: {
			messageMarker: 23,
			packetMarker: 6,
		},
	},
	{
		/** cSpell: disable-next-line */
		input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
		output: {
			messageMarker: 29,
			packetMarker: 10,
		},
	},
	{
		/** cSpell: disable-next-line */
		input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
		output: {
			messageMarker: 26,
			packetMarker: 11,
		},
	},
];

describe('testing supplyStacks', () => {
	it.each(TESTS)(
		'should return the correct solution for example tests',
		({ input, output }) => {
			expect(tuningTrouble(input)).toStrictEqual(output);
		}
	);
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');
		const response = tuningTrouble(input);
		const solution: Solution = {
			messageMarker: 3476,
			packetMarker: 1210,
		};
		expect(response).toStrictEqual(solution);
	});
});
