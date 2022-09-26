// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
	env: {
		es2021: true,
		node: true,
		jest: true,
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
		'import',
	],
	rules: {
		indent: ['off', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		radix: ['warn', 'as-needed'],
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'never',
		}],
		'import/extensions': [
			'warn',
			{
				'.ts': 'never',
				'.tsx': 'never',
			},
		],
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
		'no-console': ['error', {
			allow: ['warn', 'error', 'info'],
		}],
		'import/prefer-default-export': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-unnecessary-type-constraint': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'comma',
				requireLast: true,
			},
			singleline: {
				delimiter: 'comma',
				requireLast: true,
			},
		}],
	},
	overrides: [
		{
			files: ['*.test.ts'],
			extends: ['plugin:jest/all'],
			plugins: ['jest'],
			rules: {
				'jest/prefer-expect-assertions': 'off',
				'jest/require-top-level-describe': 'off',
			},
		}
	],
	settings: {
		'import/resolver': {
			typescript: {},
		},
		jest: {
			version: 26,
		},
	},
};

module.exports = config;