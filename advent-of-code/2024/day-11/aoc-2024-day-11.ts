import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day11Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-11",
);

const map = new Map<string, number>();

const getStoneCount = (stone: bigint, total: number, idx: number): number => {
	if (idx === total) return 1;

	const key = `${stone}-${idx}-${total}`;
	const curr = map.get(key);

	if (curr) return curr;

	let count = 0;

	if (stone === 0n) {
		count = getStoneCount(1n, total, idx + 1);
	} else {
		const str = String(stone);
		const isEvenLength = str.length % 2 === 0;
		if (!isEvenLength) {
			count = getStoneCount(stone * 2024n, total, idx + 1);
		} else {
			const left = BigInt(str.slice(0, str.length / 2));
			const right = BigInt(str.slice(str.length / 2));
			count += getStoneCount(left, total, idx + 1);
			count += getStoneCount(right, total, idx + 1);
		}
	}
	map.set(key, count);
	return count;
};

export const aoc2024Day11 = (input: string) => {
	const stones: bigint[] = input.trim().split(" ").map(BigInt);
	let count25 = 0;
	let count75 = 0;

	for (const stone of stones) {
		count25 += getStoneCount(stone, 25, 0);
		count75 += getStoneCount(stone, 75, 0);
	}

	return { count25, count75 };
};

if (!config.isTest) {
	console.time("aoc-2024-day-11");
	const input = await readFile(path.join(day11Path, "input.txt"), "utf-8");
	const res = aoc2024Day11(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-11");
}
