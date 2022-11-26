import { verticalSlashes, invalidError } from './vertical-slashes';

interface Test {
	input: string,
	output: string,
}

const tests: Test[] = [
	{
		input: String.raw`\\\//\/\\`,
		output: [
			'\\',
			' \\',
			'  \\',
			'  /',
			' /',
			' \\',
			' /',
			' \\',
			'  \\',
		].join('\n'),
	},
	{
		input: String.raw`\\\\`,
		output: [
			'\\',
			' \\',
			'  \\',
			'   \\',
		].join('\n'),
	},
	{
		input: String.raw`//\\`,
		output: [
			'/',
			'/',
			'\\',
			' \\',
		].join('\n'),
	},
	{
		input: String.raw`\\///\\\\`,
		output: [
			'\\',
			' \\',
			' /',
			'/',
			'/',
			'\\',
			' \\',
			'  \\',
			'   \\',
		].join('\n'),
	},
];

describe('testing verticalSlashes', () => {
	it.each(tests)('should return formed slash path', ({ input, output }) => {
		expect(verticalSlashes(input)).toStrictEqual(output);
	});
	it('should throw for invalid input', () => {
		expect(() =>
			verticalSlashes(String.raw`  \/`)
		).toThrow(invalidError);
		expect(() =>
			verticalSlashes('')
		).toThrow(invalidError);
	});
});
