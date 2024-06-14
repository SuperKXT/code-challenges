/** @type {import('eslint').Linter.Config} */
const config = {
	reportUnusedDisableDirectives: true,
	env: { es2021: true, browser: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	plugins: ['import', 'unused-imports', '@typescript-eslint', 'only-warn'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: true,
		tsconfigRootDir: __dirname,
	},
	settings: {
		'import/resolver': { typescript: true },
	},
	ignorePatterns: [
		'package-lock.json',
		'pnpm-lock.yaml',
		'node_modules',
		'vscode-extension',
		'.git/objects',
		'.vscode',
		'.vscode-insiders',
		'coverage',
		'build',
		'dist',
		'public',
		'trace',
		'**/*.mp3',
		'tsconfig.vitest-temp.json',
	],
	rules: {
		'no-extra-semi': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-unexpected-multiline': 'off',
		'array-callback-return': ['warn', { checkForEach: true }],
		'default-case-last': 'warn',
		eqeqeq: 'warn',
		'func-names': ['warn', 'never'],
		'guard-for-in': 'warn',
		indent: 'off',
		'logical-assignment-operators': 'warn',
		'max-depth': ['warn', { max: 7 }],
		'max-lines': ['warn', 1000],
		'max-params': ['warn', 5],
		'new-cap': 'warn',
		'no-alert': 'warn',
		'no-bitwise': 'warn',
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'no-constructor-return': 'warn',
		'no-else-return': ['warn', { allowElseIf: false }],
		'no-extend-native': 'warn',
		'no-extra-label': 'warn',
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
			'error',
			{
				paths: [
					{
						name: 'dayjs',
						importNames: ['default'],
						message: 'Please import dayjsUtc helper from `~/helpers/date`.',
					},
					{
						name: '@mui/system',
						message: 'Import from @mui/material instead',
					},
					{
						name: '@mui/icons-material',
						message: 'Use AppIcon component',
					},
					{
						name: 'react-router-dom',
						importNames: ['NavLink', 'useNavigate', 'Navigate'],
						message: 'Please use the local alternative',
					},
				],
			},
		],
		'no-restricted-syntax': [
			'warn',
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
		'prefer-promise-reject-errors': 'warn',
		'prefer-regex-literals': ['warn', { disallowRedundantWrapping: true }],
		'prefer-template': 'warn',
		'require-unicode-regexp': 'warn',
		yoda: 'warn',

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
		'import/no-nodejs-modules': 'error',
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
		'@typescript-eslint/no-explicit-any': [
			'warn',
			{ ignoreRestArgs: true, fixToUnknown: true },
		],
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-loop-func': 'warn',
		'@typescript-eslint/no-misused-promises': [
			'warn',
			{ checksVoidReturn: false },
		],
		'@typescript-eslint/no-redundant-type-constituents': 'warn',
		'@typescript-eslint/no-shadow': 'warn',
		'no-constant-condition': 'off',
		'@typescript-eslint/no-unnecessary-condition': [
			'warn',
			{ allowConstantLoopConditions: true },
		],
		'@typescript-eslint/no-unused-expressions': [
			'warn',
			{
				allowShortCircuit: true,
				allowTernary: true,
				enforceForJSX: true,
			},
		],
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-useless-empty-export': 'warn',
		'@typescript-eslint/non-nullable-type-assertion-style': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
		'@typescript-eslint/prefer-reduce-type-parameter': 'off',
		'@typescript-eslint/no-invalid-void-type': 'off',
		'@typescript-eslint/promise-function-async': 'warn',
		'@typescript-eslint/require-array-sort-compare': [
			'warn',
			{ ignoreStringArrays: true },
		],
		'@typescript-eslint/return-await': ['warn', 'always'],
		'@typescript-eslint/switch-exhaustiveness-check': 'warn',
		'@typescript-eslint/restrict-template-expressions': [
			'warn',
			{ allowAny: false },
		],
		'@typescript-eslint/ban-types': [
			'warn',
			{
				types: {
					'{}': false,
					extendDefaults: true,
				},
			},
		],
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{ minimumDescriptionLength: 3 },
		],
		'@typescript-eslint/no-namespace': ['warn', { allowDeclarations: true }],
		'@typescript-eslint/array-type': 'off',
	},
	overrides: [
		{
			files: ['**/*.tsx', '**/*.jsx'],
			extends: [
				'plugin:react/recommended',
				'plugin:react/jsx-runtime',
				'plugin:react-hooks/recommended',
				'plugin:jsx-a11y/recommended',
			],
			plugins: ['jsx-expressions', 'react-refresh'],
			settings: {
				react: { version: 'detect' },
			},
			rules: {
				'@typescript-eslint/no-unnecessary-type-constraint': 'off',
				'react/jsx-filename-extension': [
					'warn',
					{ extensions: ['jsx', 'tsx'] },
				],
				'react/jsx-fragments': 'warn',
				'react/jsx-max-depth': ['warn', { max: 6 }],
				'react/jsx-no-constructed-context-values': 'warn',
				'react/jsx-no-script-url': 'warn',
				'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
				'react/jsx-sort-props': [
					'warn',
					{
						noSortAlphabetically: true,
						multiline: 'last',
						callbacksLast: true,
						reservedFirst: true,
						shorthandLast: true,
					},
				],
				'react/no-access-state-in-setstate': 'warn', // cSpell: disable-line
				'react/jsx-key': [
					'warn',
					{
						warnOnDuplicates: true,
						checkKeyMustBeforeSpread: true,
						checkFragmentShorthand: true,
					},
				],
				'react/no-danger': 'warn',
				'react/no-object-type-as-default-prop': 'warn',
				'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
				'react/self-closing-comp': 'warn',
				'react/void-dom-elements-no-children': 'warn',
				'react/prop-types': 'off',
				'jsx-expressions/strict-logical-expressions': 'warn',
				'react-refresh/only-export-components': 'warn',
			},
		},
		{
			files: ['src/contexts/**/*', 'src/hooks/**/*'],
			rules: {
				'react-refresh/only-export-components': 'off',
			},
		},
		{
			files: ['*.test.ts'],
			extends: ['plugin:vitest/all', 'plugin:testing-library/react'],
			plugins: ['vitest', 'testing-library'],
			rules: {
				'vitest/prefer-expect-assertions': 'off',
				'vitest/require-top-level-describe': 'off',
				'vitest/max-expects': ['warn', { max: 10 }],
				'testing-library/prefer-explicit-assert': [
					'warn',
					{ assertion: 'toBeInTheDocument' },
				],
				'testing-library/prefer-user-event': 'warn',
			},
		},
		{
			files: ['**/*.cjs', '**/*.js'],
			rules: {
				'import/no-commonjs': 'off',
			},
		},
		{
			files: ['**/*'],
			excludedFiles: ['src/**/*'],
			env: { es2021: true, node: true },
			rules: {
				'import/no-nodejs-modules': 'off',
			},
		},
		{
			files: ['src/content/**/*'],
			plugins: ['sort-keys-plus'],
			rules: {
				'sort-keys-plus/sort-keys': 'warn',
			},
		},
	],
};

module.exports = config;
