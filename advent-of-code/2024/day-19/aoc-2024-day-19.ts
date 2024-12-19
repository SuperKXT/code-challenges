import { readFile } from 'fs/promises';
import path from 'path';

import { config } from '../../../config.js';

export const day19Path = path.join(
	config.dirname,
	'advent-of-code',
	'2024',
	'day-19',
);

const checkDesign = (design: string, towels: string[]): boolean => {
	if (design === '') return true;
	for (const towel of towels) {
		if (!design.startsWith(towel)) continue;
		if (checkDesign(design.slice(towel.length), towels)) return true;
	}
	return false;
};

export const aoc2024Day19 = (input: string) => {
	const [towelStr, ...designs] = input.trim().split('\n').filter(Boolean);
	if (!towelStr || !designs.length) throw new Error('Invalid input');
	const towels = towelStr.split(',').map((r) => r.trim());

	let count = 0;
	for (const design of designs) {
		if (checkDesign(design, towels)) count++;
	}

	return { count };
};

if (!config.isTest) {
	console.time('aoc-2024-day-19');
	const input = await readFile(path.join(day19Path, 'input.txt'), 'utf-8');
	const res = aoc2024Day19(input);
	console.info(res);
	console.timeEnd('aoc-2024-day-19');
}
