import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '../../../config.js';

export const day13Path = path.join(
	config.dirname,
	'advent-of-code',
	'2024',
	'day-13',
);

const coordRegex = /(?<=(?:X\+|=)|(?:Y\+|=))\d+/gu;

const getCoords = (s: string): [number, number] => {
	const matches = s.match(coordRegex);
	const x = parseInt(matches?.[0] ?? '');
	const y = parseInt(matches?.[1] ?? '');
	if (isNaN(x) || isNaN(y)) throw new Error(`Invalid coord string`);
	return [x, y];
};

export const aoc2024Day13 = (input: string) => {
	const machines = input
		.trim()
		.split('\n\n')
		.map((s) => {
			const lines = s.split('\n');
			const a = getCoords(lines[0] ?? '');
			const b = getCoords(lines[1] ?? '');
			const prize = getCoords(lines[2] ?? '');
			return { a, b, prize, tokens: 0 };
		});

	let count = 0;
	outer: for (let iA = 1; iA <= 100; iA++) {
		for (let iB = 1; iB <= 100; iB++) {
			for (const machine of machines) {
				const { a, b, prize } = machine;
				const x = a[0] * iA + b[0] * iB;
				const y = a[1] * iA + b[1] * iB;
				if (x === prize[0] && y === prize[1]) {
					machine.tokens = iA * 3 + iB;
					count++;
					if (count === machines.length) break outer;
				}
			}
		}
	}

	const tokens = machines.reduce((acc, machine) => acc + machine.tokens, 0);

	return { tokens };
};

if (!config.isTest) {
	console.time('aoc-2024-day-13');
	const input = await readFile(path.join(day13Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day13(input);
	console.info(res);
	console.timeEnd('aoc-2024-day-13');
}
