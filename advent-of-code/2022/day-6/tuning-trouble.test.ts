import { readFile } from 'fs/promises';
import path from 'path';

import { tuningTrouble } from './tuning-trouble';

type Solution = ReturnType<typeof tuningTrouble>;

interface Test {
	input: string;
	output: Solution;
}

const tests: Test[] = [
	{
		/** cSpell: disable-next-line */
		input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
		output: {
			packetMarker: 7,
			messageMarker: 19,
		},
	},
	{
		/** cSpell: disable-next-line */
		input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
		output: {
			packetMarker: 5,
			messageMarker: 23,
		},
	},
	{
		/** cSpell: disable-next-line */
		input: 'nppdvjthqldpwncqszvftbrmjlhg',
		output: {
			packetMarker: 6,
			messageMarker: 23,
		},
	},
	{
		/** cSpell: disable-next-line */
		input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
		output: {
			packetMarker: 10,
			messageMarker: 29,
		},
	},
	{
		/** cSpell: disable-next-line */
		input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
		output: {
			packetMarker: 11,
			messageMarker: 26,
		},
	},
];

describe('testing supplyStacks', () => {
	it.each(tests)(
		'should return the correct solution for example tests',
		({ input, output }) => {
			expect(tuningTrouble(input)).toStrictEqual(output);
		}
	);
	it('should return the correct solution for the input file', async () => {
		const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');
		const response = tuningTrouble(input);
		const solution: Solution = {
			packetMarker: 1210,
			messageMarker: 3476,
		};
		expect(response).toStrictEqual(solution);
	});
});
