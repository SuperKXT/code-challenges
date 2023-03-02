// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
	env: {
		es2021: true,
		node: true,
		jest: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['import', 'unused-imports'],
	rules: {
		indent: ['off', 'tab'],
		'no-console': [
			'error',
			{
				allow: ['warn', 'error', 'info'],
			},
		],
		'no-restricted-syntax': [
			'error',
			{
				selector: 'TSEnumDeclaration',
				message: "Don't declare enums. Use POJO with as const instead",
			},
		],
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'warn',
		'import/extensions': [
			'warn',
			'never',
			{
				helpers: 'always',
				test: 'always',
				styles: 'always',
			},
		],
		'import/no-duplicates': 'warn',
		'import/no-default-export': 'error',
		'import/consistent-type-specifier-style': 'error',
		'object-shorthand': ['error', 'always'],
		'no-constant-condition': [
			'error',
			{
				checkLoops: false,
			},
		],
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: ['../*'],
						message: 'Usage of relative parent imports is not allowed.',
					},
				],
			},
		],
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			parserOptions: {
				project: './tsconfig.json',
			},
			plugins: ['@typescript-eslint'],
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:@typescript-eslint/strict',
			],
			rules: {
				'@typescript-eslint-no-extra-semi': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-inferrable-types': 'off',
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{
						argsIgnorePattern: '^_',
						destructuredArrayIgnorePattern: '^_',
						caughtErrors: 'all',
					},
				],
				'@typescript-eslint/consistent-type-exports': 'error',
				'@typescript-eslint/consistent-type-imports': 'error',
				'@typescript-eslint/non-nullable-type-assertion-style': 'off',
				'@typescript-eslint/no-unnecessary-condition': [
					'error',
					{
						allowConstantLoopConditions: true,
					},
				],
				'@typescript-eslint/no-confusing-void-expression': [
					'error',
					{
						ignoreArrowShorthand: true,
					},
				],
				'@typescript-eslint/no-require-imports': 'error',
				'@typescript-eslint/no-redundant-type-constituents': 'error',
				'@typescript-eslint/no-useless-empty-export': 'error',
				'@typescript-eslint/prefer-readonly': 'error',
				'@typescript-eslint/switch-exhaustiveness-check': 'error',
				'@typescript-eslint/sort-type-constituents': 'warn',
				'@typescript-eslint/require-array-sort-compare': [
					'error',
					{
						ignoreStringArrays: true,
					},
				],
				'@typescript-eslint/promise-function-async': 'warn',
				'@typescript-eslint/default-param-last': 'warn',
				'no-dupe-class-members': 'off',
				'@typescript-eslint/no-dupe-class-members': 'warn',
				'@typescript-eslint/no-loop-func': 'warn',
				'@typescript-eslint/no-shadow': [
					'error',
					{
						builtinGlobals: true,
					},
				],
				'@typescript-eslint/no-unused-expressions': [
					'error',
					{
						allowShortCircuit: true,
						allowTernary: true,
						enforceForJSX: true,
					},
				],
				'@typescript-eslint/return-await': 'error',
				'no-use-before-define': 'off',
				'@typescript-eslint/no-use-before-define': 'warn',
			},
		},
		{
			files: ['*.test.ts'],
			extends: ['plugin:jest/all'],
			plugins: ['jest'],
			parserOptions: {
				project: ['./tsconfig.json'],
			},
			rules: {
				'jest/prefer-expect-assertions': 'off',
				'jest/require-top-level-describe': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			typescript: {},
		},
		jest: {
			version: 29,
		},
	},
};

module.exports = config;
