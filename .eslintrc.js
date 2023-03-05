// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
	env: {
		es2021: true,
		jest: true,
		node: true,

		// // browser: true,
	},
	extends: [
		'eslint:recommended',
		'prettier',

		// 'react-app',
		// 'plugin:react/recommended',
		// 'plugin:react/jsx-runtime',
	],
	overrides: [
		{
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:@typescript-eslint/strict',
			],
			files: ['**/*.ts', '**/*.tsx'],
			parserOptions: {
				project: './tsconfig.json',
			},
			plugins: ['@typescript-eslint'],
			rules: {
				'@typescript-eslint-no-extra-semi': 'off',
				'@typescript-eslint/consistent-type-exports': 'error',
				'@typescript-eslint/consistent-type-imports': 'error',
				'@typescript-eslint/default-param-last': 'warn',
				'@typescript-eslint/no-confusing-void-expression': [
					'error',
					{
						ignoreArrowShorthand: true,
					},
				],
				'@typescript-eslint/no-dupe-class-members': 'warn',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-inferrable-types': 'off',
				'@typescript-eslint/no-loop-func': 'warn',
				'@typescript-eslint/no-redundant-type-constituents': 'error',
				'@typescript-eslint/no-require-imports': 'error',
				'@typescript-eslint/no-shadow': [
					'error',
					{
						builtinGlobals: true,
					},
				],
				'@typescript-eslint/no-unnecessary-condition': [
					'error',
					{
						allowConstantLoopConditions: true,
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
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{
						argsIgnorePattern: '^_',
						caughtErrors: 'all',
						destructuredArrayIgnorePattern: '^_',
					},
				],
				'@typescript-eslint/no-use-before-define': 'warn',
				'@typescript-eslint/no-useless-empty-export': 'error',
				'@typescript-eslint/non-nullable-type-assertion-style': 'off',
				'@typescript-eslint/prefer-readonly': 'error',
				'@typescript-eslint/promise-function-async': 'warn',
				'@typescript-eslint/require-array-sort-compare': [
					'error',
					{
						ignoreStringArrays: true,
					},
				],
				'@typescript-eslint/return-await': 'error',
				'@typescript-eslint/sort-type-constituents': 'warn',
				'@typescript-eslint/switch-exhaustiveness-check': 'error',
				'no-constant-condition': 'off',
				'no-dupe-class-members': 'off',
				'no-unused-vars': 'off',
				'no-use-before-define': 'off',
			},
		},
		{
			extends: ['plugin:jest/all'],
			files: ['*.test.ts'],
			parserOptions: {
				project: ['./tsconfig.json'],
			},
			plugins: ['jest'],
			rules: {
				'jest/prefer-expect-assertions': 'off',
				'jest/require-top-level-describe': 'off',
			},
		},
		// // {
		// // 	files: ['**/*.tsx', '**/*.jsx'],
		// // 	plugins: ['jsx-expressions'],
		// // 	rules: {
		// // 		'@typescript-eslint/no-unnecessary-type-constraint': 'off',
		// // 		'no-autofix/jsx-expressions/strict-logical-expressions': 'error',
		// // 	},
		// // },
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',

		// // ecmaFeatures: {
		// // 	jsx: true,
		// // },
	},
	plugins: [
		'import',
		'unused-imports',
		'sort-keys-plus',
		// // 'no-autofix'
	],
	rules: {
		'array-callback-return': ['error', { checkForEach: true }],
		curly: ['error', 'multi', 'consistent'],
		'default-case-last': 'error',
		eqeqeq: 'error',
		'func-names': ['error', 'never'],
		'func-style': 'error',
		'guard-for-in': 'error',
		'id-length': ['error', { exceptions: ['_'], max: 30, min: 2 }],
		'import/consistent-type-specifier-style': 'error',
		'import/extensions': [
			'warn',
			'never',
			{ helpers: 'always', styles: 'always', test: 'always' },
		],
		'import/no-default-export': 'error',
		'import/no-duplicates': 'warn',
		indent: ['off', 'tab'],
		'logical-assignment-operators': 'error',
		'max-classes-per-file': 'error',
		'max-depth': 'error',
		'max-lines': ['error', 1000],
		'max-lines-per-function': ['error', 1000],
		'max-nested-callbacks': ['error', 5],
		'max-params': ['error', 5],
		'new-cap': 'error',
		'no-alert': 'error',
		'no-await-in-loop': 'warn',
		'no-bitwise': 'error',
		'no-caller': 'error',
		'no-confusing-arrow': 'error',
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
		'no-constant-condition': ['error', { checkLoops: false }],
		'no-constructor-return': 'error',
		'no-div-regex': 'error',
		'no-else-return': ['error', { allowElseIf: false }],
		'no-empty-static-block': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-floating-decimal': 'error',
		'no-implicit-coercion': ['error', { disallowTemplateShorthand: true }],
		'no-inline-comments': 'error',
		'no-label-var': 'error',
		'no-labels': ['error', { allowLoop: true, allowSwitch: true }],
		'no-lone-blocks': 'error',
		'no-lonely-if': 'error',
		'no-multi-assign': 'error',
		'no-multi-str': 'error',
		'no-new': 'error',
		'no-new-object': 'error',
		'no-new-wrappers': 'error',
		'no-octal-escape': 'error',
		'no-param-reassign': 'error',
		'no-promise-executor-return': 'error',
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
		'no-restricted-syntax': [
			'error',
			{
				message: "Don't declare enums. Use POJO with as const instead",
				selector: 'TSEnumDeclaration',
			},
		],
		'no-return-assign': 'error',
		'no-script-url': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-template-curly-in-string': 'warn',
		'no-undef-init': 'warn',
		'no-unmodified-loop-condition': 'error',
		'no-unneeded-ternary': ['error', { defaultAssignment: false }],
		'no-unreachable-loop': 'error',
		'no-unused-private-class-members': 'warn',
		'no-unused-vars': 'off',
		'no-useless-call': 'error',
		'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
		'no-useless-concat': 'error',
		'no-useless-constructor': 'error',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-void': 'error',
		'object-shorthand': ['error', 'always'],
		'one-var': ['error', 'never'],
		'operator-assignment': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-exponentiation-operator': 'error',
		'prefer-numeric-literals': 'error',
		'prefer-object-has-own': 'error',
		'prefer-object-spread': 'error',
		'prefer-promise-reject-errors': 'error',
		'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'require-atomic-updates': 'error',
		'require-unicode-regexp': 'error',
		'sort-keys-plus/sort-keys': [
			'error',
			'asc',
			{ allowLineSeparatedGroups: true },
		],
		'spaced-comment': 'error',
		'symbol-description': 'error',
		'unused-imports/no-unused-imports': 'warn',
		yoda: 'error',
	},
	settings: {
		'import/resolver': {
			typescript: {},
		},
		jest: {
			version: 29,
		},

		// // react: {
		// // 	version: 'detect',
		// // },
	},
};

module.exports = config;
