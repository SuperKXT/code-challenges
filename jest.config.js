// @ts-check

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	clearMocks: true,
	collectCoverage: true,
	moduleNameMapper: {
		'^@helpers/(.*)$': '<rootDir>/helpers/$1',
	}
};

module.exports = config;