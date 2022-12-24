// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
	env: {
		es2021: true,
		node: true,
		jest: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'import',
		'unused-imports',
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
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					['sibling', 'index', 'object'],
					'type',
				],
				pathGroups: [
					{
						pattern: '~/helpers/**',
						group: 'internal',
					},
				],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
		'import/prefer-default-export': 'off',
		'no-console': ['error', {
			allow: ['warn', 'error', 'info'],
		}],
		'no-multiple-empty-lines': ['error', {
			max: 1,
			maxEOF: 0,
			maxBOF: 0,
		}],
		'eol-last': ['error', 'always'],
		'quote-props': ['error', 'as-needed'],
		'no-duplicate-imports': ['warn', {
			includeExports: true,
		}],
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': [
			'warn',
			{ vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
		],
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			extends: ['plugin:@typescript-eslint/recommended',],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			rules: {
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
				'@typescript-eslint/no-unused-vars': 'off',
			},
			overrides: [
				{
					files: ['*.test.ts'],
					extends: ['plugin:jest/all'],
					plugins: ['jest'],
					parserOptions: {
						project: ['./tsconfig.json']
					},
					rules: {
						'jest/prefer-expect-assertions': 'off',
						'jest/require-top-level-describe': 'off',
					},
				},
			],
		},
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
