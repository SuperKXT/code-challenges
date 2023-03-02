import { formatStrategies, formatToken } from './format-token.helpers';

import type { FormatStrategy } from './format-token.helpers';

interface Test {
	input: string;
	output: Record<FormatStrategy, string>;
}

const tests: Test[] = [
	{
		input: 'thisIsSomeTestString',
		output: {
			camel: 'thisIsSomeTestString',
			pascal: 'ThisIsSomeTestString',
			constant: 'THIS_IS_SOME_TEST_STRING',
			kebab: 'this-is-some-test-string',
			snake: 'this_is_some_test_string',
		},
	},
	{
		input: 'this is a VERY     badly   -----formatted.......## STRING.',
		output: {
			camel: 'thisIsAVeryBadlyFormatted.String',
			pascal: 'ThisIsAVeryBadlyFormatted.String',
			constant: 'THIS_IS_A_VERY_BADLY_FORMATTED._STRING',
			kebab: 'this-is-a-very-badly-formatted.-string',
			snake: 'this_is_a_very_badly_formatted._string',
		},
	},
	{
		input: '----SaleOrderID----',
		output: {
			camel: 'saleOrderId',
			pascal: 'SaleOrderId',
			constant: 'SALE_ORDER_ID',
			kebab: 'sale-order-id',
			snake: 'sale_order_id',
		},
	},
	{
		input: 'alpha-   1numeric',
		output: {
			camel: 'alpha1Numeric',
			pascal: 'Alpha1Numeric',
			constant: 'ALPHA_1_NUMERIC',
			kebab: 'alpha-1-numeric',
			snake: 'alpha_1_numeric',
		},
	},
	{
		input: '    Folder - file-2',
		output: {
			camel: 'folderFile2',
			pascal: 'FolderFile2',
			constant: 'FOLDER_FILE_2',
			kebab: 'folder-file-2',
			snake: 'folder_file_2',
		},
	},
	{
		input: 'api helpers.helpers.js',
		output: {
			camel: 'apiHelpers.helpers.js',
			pascal: 'ApiHelpers.helpers.js',
			constant: 'API_HELPERS.HELPERS.JS',
			kebab: 'api-helpers.helpers.js',
			snake: 'api_helpers.helpers.js',
		},
	},
];

describe.each(tests)('test formatString helper', ({ input, output }) => {
	it(`should return ${output.camel} for formatString(${input})`, () => {
		const response = formatToken(input);
		expect(response).toStrictEqual(output.camel);
	});
	it.each(formatStrategies)(
		'should return valid formatted string by given parameters',
		(strategy) => {
			const response = formatToken(input, strategy);
			expect(response).toStrictEqual(output[strategy]);
		}
	);
});
