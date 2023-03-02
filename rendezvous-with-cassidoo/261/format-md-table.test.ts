import { formatMarkdownTable } from './format-md-table';

interface Test {
	input: string;
	output: string;
}

const tests: Test[] = [
	{
		input: [
			'| Syntax | Description |',
			'| --- | ----------- |',
			'| Header | Title |',
			'| Paragraph | Text |',
		].join('\n'),
		output: [
			'| Syntax    | Description |',
			'| --------- | ----------- |',
			'| Header    | Title       |',
			'| Paragraph | Text        |',
		].join('\n'),
	},
	{
		input: [
			'',
			'| Syntax     | Description |',
			'| --- |      ----------- |',
			'| Header | Title | Extra | ',
			'   | Paragraph | Text |   ',
			'',
		].join('\n'),
		output: [
			'| Syntax    | Description |',
			'| --------- | ----------- |',
			'| Header    | Title       |',
			'| Paragraph | Text        |',
		].join('\n'),
	},
	{
		input: [
			'',
			'| Syntax     | Description | Extra |',
			'     | --- |      ----------- |',
			'| Header | Title | Ex |  ',
			'   | Paragraph | Text |   ',
			'',
		].join('\n'),
		output: [
			'| Syntax    | Description | Extra |',
			'| --------- | ----------- | ----- |',
			'| Header    | Title       | Ex    |',
			'| Paragraph | Text        |       |',
		].join('\n'),
	},
	{
		input: [
			'',
			'| Syntax     | Description |',
			'| --- |      ----------- |',
			'| Header | Title | Extra |',
			'   | Paragraph | Text |   ',
			'',
		].join('\n'),
		output: [
			'| Syntax    | Description |',
			'| --------- | ----------- |',
			'| Header    | Title       |',
			'| Paragraph | Text        |',
		].join('\n'),
	},
	{
		input: '',
		output: '',
	},
];

describe('format markdown table string', () => {
	it.each(tests)(
		'should return correctly formatted markdown',
		({ input, output }) => {
			const formatted = formatMarkdownTable(input);
			expect(formatted).toStrictEqual(output);
		}
	);
});
