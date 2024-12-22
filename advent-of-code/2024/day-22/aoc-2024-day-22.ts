import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '../../../config.js';

export const day22Path = path.join(
	config.dirname,
	'advent-of-code',
	'2024',
	'day-22',
);

const mix = (a: bigint, b: bigint) => {
	// eslint-disable-next-line no-bitwise
	return a ^ b;
};

const prune = (a: bigint) => {
	return a % 16777216n;
};

const getNewSecret = (a: bigint) => {
	const num1 = prune(mix(a, a * 64n));
	const num2 = prune(mix(num1, num1 / 32n));
	const num3 = prune(mix(num2, num2 * 2048n));
	return num3;
};

export const aoc2024Day22 = (input: string) => {
	const codes = input.trim().split('\n').map(BigInt).filter(Boolean);
	if (!codes.length) throw new Error('Invalid input');

	for (let i = 0; i < 2000; i++) {
		for (let j = 0; j < codes.length; j++) {
			const code = codes[j] as bigint;
			const newCode = getNewSecret(code);
			codes[j] = newCode;
		}
	}

	const sum = codes.reduce((acc, code) => acc + code);

	return { sum };
};

if (!config.isTest) {
	console.time('aoc-2024-day-22');
	const input = await readFile(path.join(day22Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day22(input);
	console.info(res);
	console.timeEnd('aoc-2024-day-22');
}
