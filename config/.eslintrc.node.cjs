/** @type {import('eslint').Linter.Config} */
const config = {
	env: { es2021: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:n/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: true,
		tsconfigRootDir: __dirname,
	},
	plugins: ['import', 'unused-imports', '@typescript-eslint'],
	settings: {
		'import/resolver': {
			node: true,
			typescript: true,
		},
	},
	rules: {
		'array-callback-return': ['warn', { checkForEach: true }],
		curly: ['warn', 'multi-or-nest', 'consistent'],
		'default-case-last': 'warn',
		eqeqeq: 'error',
		'func-names': ['warn', 'never'],
		'guard-for-in': 'warn',
		indent: 'off',
		'logical-assignment-operators': 'warn',
		'max-depth': ['warn', { max: 7 }],
		'max-lines': ['warn', 1000],
		'max-params': ['warn', 5],
		// TODO turn this rule off after migrating from typebox to zod
		'new-cap': 'off',
		'no-alert': 'warn',
		'no-bitwise': 'warn',
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'no-constructor-return': 'warn',
		'no-else-return': ['warn', { allowElseIf: false }],
		'no-extend-native': 'warn',
		'no-extra-label': 'warn',
		'no-floating-decimal': 'warn',
		'no-implicit-coercion': ['warn', { disallowTemplateShorthand: true }],
		'no-label-var': 'warn',
		'no-labels': ['warn', { allowLoop: true, allowSwitch: true }],
		'no-lone-blocks': 'warn',
		'no-lonely-if': 'warn',
		'no-multi-assign': 'warn',
		'no-multi-str': 'warn',
		'no-new': 'warn',
		'no-new-object': 'warn',
		'no-new-wrappers': 'warn',
		'no-octal-escape': 'warn',
		'no-param-reassign': 'warn',
		'no-promise-executor-return': 'warn',
		'no-restricted-imports': [
			'warn',
			{
				paths: [
					{ name: 'buffer', message: 'Use Uint8Array instead.' },
					{ name: 'node:buffer', message: 'Use Uint8Array instead.' },
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
		'no-return-assign': 'warn',
		'no-self-compare': 'warn',
		'no-sequences': 'warn',
		'no-template-curly-in-string': 'warn',
		'no-unmodified-loop-condition': 'warn',
		'no-unneeded-ternary': ['warn', { defaultAssignment: false }],
		'no-unreachable-loop': 'warn',
		'no-unused-vars': 'off',
		'no-useless-computed-key': ['warn', { enforceForClassMembers: true }],
		'no-useless-concat': 'warn',
		'no-useless-rename': 'warn',
		'no-useless-return': 'warn',
		'object-shorthand': ['warn', 'always'],
		'one-var': ['warn', 'never'],
		'operator-assignment': 'warn',
		'prefer-arrow-callback': 'warn',
		'prefer-exponentiation-operator': 'warn',
		'prefer-numeric-literals': 'warn',
		'prefer-object-has-own': 'warn',
		'prefer-object-spread': 'warn',
		'prefer-const': 'warn',
		'prefer-promise-reject-errors': 'warn',
		'prefer-regex-literals': ['warn', { disallowRedundantWrapping: true }],
		'prefer-template': 'warn',
		'require-unicode-regexp': 'warn',
		yoda: 'warn',
		strict: ['error', 'global'],
		'no-restricted-globals': [
			'warn',
			{ name: '__dirname', message: 'Import __dirname from config instead' },
			{ name: '__filename', message: 'Import __filename from config instead' },
			{ name: 'Buffer', message: 'Use Uint8Array instead.' },
		],
		'n/no-process-env': 'warn',
		'n/no-unpublished-import': 'off',
		'n/no-missing-import': 'off',

		'import/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
		'import/first': 'warn',
		'import/newline-after-import': 'warn',
		'import/no-commonjs': 'warn',
		'import/no-default-export': 'warn',
		'import/no-deprecated': 'off',
		'import/namespace': 'off',
		'import/no-duplicates': 'warn',
		'import/export': 'off',
		'import/no-empty-named-blocks': 'warn',
		'import/no-self-import': 'warn',
		'import/no-useless-path-segments': 'warn',
		'import/order': [
			'warn',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'sibling',
					'index',
					'parent',
					'type',
				],
				'newlines-between': 'always',
			},
		],
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrors: 'all',
				destructuredArrayIgnorePattern: '^_',
			},
		],

		'@typescript-eslint/consistent-type-exports': 'warn',
		'@typescript-eslint/consistent-type-imports': 'warn',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/default-param-last': 'warn',
		'no-dupe-class-members': 'off',
		'@typescript-eslint/no-dupe-class-members': 'warn',
		'@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-loop-func': 'warn',
		'@typescript-eslint/no-misused-promises': [
			'warn',
			{
				checksVoidReturn: false,
			},
		],
		'@typescript-eslint/no-redundant-type-constituents': 'warn',
		'@typescript-eslint/no-shadow': 'warn',
		'no-constant-condition': 'off',
		'@typescript-eslint/no-unnecessary-condition': [
			'warn',
			{ allowConstantLoopConditions: true },
		],
		'@typescript-eslint/no-unused-expressions': [
			'error',
			{
				allowShortCircuit: true,
				allowTernary: true,
				enforceForJSX: true,
			},
		],
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-use-before-define': 'warn',
		'@typescript-eslint/no-useless-empty-export': 'warn',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/non-nullable-type-assertion-style': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/prefer-reduce-type-parameter': 'off',
		'@typescript-eslint/no-invalid-void-type': 'off',
		'@typescript-eslint/promise-function-async': 'warn',
		'@typescript-eslint/require-array-sort-compare': [
			'warn',
			{ ignoreStringArrays: true },
		],
		'@typescript-eslint/return-await': 'warn',
		'@typescript-eslint/switch-exhaustiveness-check': 'warn',
		'@typescript-eslint/restrict-template-expressions': [
			'warn',
			{ allowAny: true },
		],
		'@typescript-eslint/ban-types': [
			'warn',
			{
				types: {
					'{}': false,
					extendDefaults: true,
					Buffer: {
						message: 'Use Uint8Array instead.',
						suggest: ['Uint8Array'],
					},
				},
			},
		],
		'@typescript-eslint/no-namespace': ['warn', { allowDeclarations: true }],
	},
	overrides: [
		{
			files: ['src/routes/**/*', 'src/plugins/**/*'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
		{
			files: ['*.test.ts'],
			parserOptions: {
				project: ['./tsconfig.json'],
			},
			extends: ['plugin:vitest/all'],
			plugins: ['vitest'],
			rules: {
				'vitest/prefer-expect-assertions': 'off',
				'vitest/require-top-level-describe': 'off',
				'vitest/max-expects': ['error', { max: 10 }],
			},
		},
		{
			files: ['**/*.cjs'],
			rules: {
				'import/no-commonjs': 'off',
				'no-restricted-globals': 'off',
			},
		},
	],
};

module.exports = config;
