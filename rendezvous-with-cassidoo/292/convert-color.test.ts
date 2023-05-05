import { convertColor } from './convert-color';

type Test = {
	args: Parameters<typeof convertColor>;
	output: ReturnType<typeof convertColor>[0];
}

const TESTS: Test[] = [
	{
		args: ['rgb', 'hex', '(255,0,0)'],
		output: '#FF0000',
	},
	{
		args: ['hsl', 'rgb', '(65,80,80)'],
		output: '(238,245,163)',
	},
	{
		args: ['hsl', 'hex', '(65,80,80)'],
		output: '#EEF5A3',
	},
	{
		args: ['hex', 'rgb', '#EEF5A3'],
		output: '(238,245,163)',
	},
];

test.each(TESTS)(
	'should convert the color string to given format',
	({ args, output }) => {
		const response = convertColor(...args);
		expect(response).toStrictEqual(output);
	}
);
