import { verticalSlashes, INVALID_ERROR } from './vertical-slashes';

type Test = {
	input: string;
	output: string;
}

const TESTS: Test[] = [
	{
		input: String.raw`\\\//\/\\`,
		output: ['\\', ' \\', '  \\', '  /', ' /', ' \\', ' /', ' \\', '  \\'].join(
			'\n'
		),
	},
	{
		input: String.raw`\\\\`,
		output: ['\\', ' \\', '  \\', '   \\'].join('\n'),
	},
	{
		input: String.raw`//\\`,
		output: ['/', '/', '\\', ' \\'].join('\n'),
	},
	{
		input: String.raw`\\///\\\\`,
		output: ['\\', ' \\', ' /', '/', '/', '\\', ' \\', '  \\', '   \\'].join(
			'\n'
		),
	},
];

describe('testing verticalSlashes', () => {
	it.each(TESTS)('should return formed slash path', ({ input, output }) => {
		expect(verticalSlashes(input)).toStrictEqual(output);
	});
	it('should throw for invalid input', () => {
		expect(() => verticalSlashes(String.raw`  \/`)).toThrow(INVALID_ERROR);
		expect(() => verticalSlashes('')).toThrow(INVALID_ERROR);
	});
});
