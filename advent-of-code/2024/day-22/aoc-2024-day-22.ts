import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day22Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-22",
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

const getPrice = (a: bigint) => {
	return Number(a.toString().at(-1) ?? "");
};

export const aoc2024Day22 = (input: string) => {
	const codes = input.trim().split("\n").map(BigInt).filter(Boolean);
	if (!codes.length) throw new Error("Invalid input");

	const sequenceMap = new Map<string, number>();
	for (let j = 0; j < codes.length; j++) {
		const visitedSequences = new Set<string>();
		let code = codes[j] as bigint;
		const prev4: { price: number; diff: number }[] = [];
		for (let i = 0; i < 2000; i++) {
			code = getNewSecret(code);

			const price = getPrice(code);
			const prev = prev4.at(-1);
			prev4.push({ price, diff: prev ? price - prev.price : 0 });
			if (prev4.length > 4) prev4.shift();
			const sequence = prev4.map((r) => r.diff).join(",");
			if (prev4.length === 4 && !visitedSequences.has(sequence)) {
				visitedSequences.add(sequence);
				const existing = sequenceMap.get(sequence) ?? 0;
				sequenceMap.set(sequence, existing + price);
			}
		}
		codes[j] = code;
	}

	let highest = -Infinity;
	for (const price of sequenceMap.values()) {
		highest = Math.max(highest, price);
	}

	const sum = codes.reduce((acc, code) => acc + code);

	return { sum, highest };
};

if (!config.isTest) {
	console.time("aoc-2024-day-22");
	const input = await readFile(path.join(day22Path, "input.txt"), "utf-8");
	const res = aoc2024Day22(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-22");
}
