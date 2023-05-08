/* eslint-disable import/no-default-export */
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		clearMocks: true,
		coverage: {
			enabled: true,
			reporter: ['html'],
		},
		environment: 'node',
		typecheck: {
			include: ['**/*.test.{ts,tsx}'],
		},
	},
});
