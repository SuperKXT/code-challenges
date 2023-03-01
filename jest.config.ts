import { pathsToModuleNameMapper } from 'ts-jest';

// eslint-disable-next-line import/extensions
import { compilerOptions } from './tsconfig.json';

import type { JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	clearMocks: true,
	collectCoverage: true,
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>',
	}),
};

// eslint-disable-next-line import/no-default-export
export default config;
