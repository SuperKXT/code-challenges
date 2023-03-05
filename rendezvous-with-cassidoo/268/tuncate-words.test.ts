import { truncateWords } from './truncate-words';

interface Test {
	input: [string, number];
	output: string;
}

const TESTS: Test[] = [
	{ input: ['never gonna give you up', 3], output: 'nev gon giv you up' },
	{
		input: ['*hello* darkness, my ~old_friend', 3],
		output: '*hel* dar, my ~old_fri',
	},
	{
		input: ['all that is gold does not glitter.', 1],
		output: 'a t i g d n g.',
	},
	{
		input: ['not all who wander are lost.', 4],
		output: 'not all who wand are lost.',
	},
];

describe('testing truncateWords', () => {
	it.each(TESTS)(
		'should return string with truncated words',
		({ input, output }) => {
			const response = truncateWords(...input);
			expect(response).toStrictEqual(output);
		}
	);
});
