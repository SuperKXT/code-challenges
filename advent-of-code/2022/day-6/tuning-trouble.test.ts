import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '~/config.js';

import { tuningTrouble } from './tuning-trouble.js';

type Solution = ReturnType<typeof tuningTrouble>;

type Test = {
	input: string;
	output: Solution;
};

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

test.each(TESTS)(
	'testing turningTrouble against example input',
	({ input, output }) => {
		expect(tuningTrouble(input)).toStrictEqual(output);
	},
);

test('testing turningTrouble against real input', async () => {
	const input = await readFile(path.join(config.dirname, 'input.txt'), 'utf-8');
	const response = tuningTrouble(input);
	const solution: Solution = {
		messageMarker: 3476,
		packetMarker: 1210,
	};
	expect(response).toStrictEqual(solution);
});
