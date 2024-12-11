import path from 'path';

import { config } from '../../../config.js';

export const day11Path = path.join(
	config.dirname,
	'advent-of-code',
	'2024',
	'day-11',
);

export const aoc2024Day11 = (input: string) => {
	const count = 0;

	let nums: bigint[] = input.trim().split(' ').map(BigInt);
	const iterations = 25;

	for (let i = 0; i < iterations; i++) {
		const newNums: bigint[] = [];
		for (const num of nums) {
			if (num === 0n) {
				newNums.push(1n);
				continue;
			}
			const str = String(num);
			const isEvenLength = str.length % 2 === 0;
			if (!isEvenLength) {
				newNums.push(num * 2024n);
				continue;
			}
			const num1 = BigInt(str.slice(0, str.length / 2));
			const num2 = BigInt(str.slice(str.length / 2));
			newNums.push(num1);
			newNums.push(num2);
		}
		nums = newNums;
	}

	return { count: nums.length };
};

if (!config.isTest) {
	console.time('aoc-2024-day-11');
	const res = aoc2024Day11(path.join(day11Path, 'input.txt'));
	console.info(res);
	console.timeEnd('aoc-2024-day-11');
}
