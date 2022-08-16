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
		'import/prefer-default-export': 'off'
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