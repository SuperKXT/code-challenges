import path from 'node:path';
import { fileURLToPath } from 'url';

export const directionEnum = /** @type {const} */ ({
	up: '^',
	right: '>',
	down: 'v',
	left: '<',
});

/** @typedef {typeof directionEnum[keyof typeof directionEnum]} TDirection */

export const cellEnum = /** @type {const} */ ({
	obstruction: '#',
	empty: '.',
	visited: 'X',
	...directionEnum,
});

/** @type {Record<TDirection, TDirection>} */
export const nextMap = {
	'^': '>',
	'>': 'v',
	v: '<',
	'<': '^',
};

export const dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));
