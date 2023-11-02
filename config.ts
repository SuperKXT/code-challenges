import { dirname } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

export const config = {
	// eslint-disable-next-line n/no-process-env
	isTest: process.env.NODE_ENV === 'test',
	filename,
	dirname: dirname(filename),
};
