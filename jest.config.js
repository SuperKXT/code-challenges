/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	clearMocks: true,
	collectCoverage: false,
	moduleNameMapper: {
		'^@helpers/(.*)$': '<rootDir>/helpers/$1',
	}
};
