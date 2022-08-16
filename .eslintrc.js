// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
	env: {
		es2021: true,
		node: true,
		jest: true
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:jest/all'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
		'jest',
		'import'
	],
	rules: {
		'import/extensions': [
			'warn',
			{
				'.ts': 'never',
				'.tsx': 'never'
			}
		],
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				}
			}
		],
		'jest/prefer-expect-assertions': 'off',
		'jest/require-top-level-describe': 'off',
		'import/prefer-default-export': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-unnecessary-type-constraint': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off', '@typescript-eslint/member-delimiter-style': ['error', {
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
	settings: {
		'import/resolver': {
			typescript: {}
		},
		jest: {
			version: 26
		}
	}
};

module.exports = config;