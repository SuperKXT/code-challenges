import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day23Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-23",
);

const mix = (a: bigint, b: bigint) => {
	// eslint-disable-next-line no-bitwise
	return a ^ b;
};

const prune = (a: bigint) => {
	return a % 16777216n;
};

const _getNewSecret = (a: bigint) => {
	const num1 = prune(mix(a, a * 64n));
	const num2 = prune(mix(num1, num1 / 32n));
	const num3 = prune(mix(num2, num2 * 2048n));
	return num3;
};

const _getPrice = (a: bigint) => {
	return Number(a.toString().at(-1) ?? "");
};

export const aoc2024Day23 = (input: string) => {
	const rows = input.trim().split("\n").filter(Boolean);
	if (!rows.length) throw new Error("Invalid input");
	const map = new Map<string, Set<string>>();

	for (const row of rows) {
		const [left, right] = row.split("-");
		if (!left || !right) throw new Error("Invalid input");

		const leftMap = map.get(left);
		if (!leftMap) map.set(left, new Set([right]));
		else leftMap.add(right);

		const rightMap = map.get(right);
		if (!rightMap) map.set(right, new Set([left]));
		else rightMap.add(left);
	}

	const connectionSet = new Set<string>();
	for (const [pc, set] of map.entries()) {
		for (const c of set) {
			const cSet = map.get(c);
			if (!cSet) continue;
			for (const c2 of cSet) {
				if (
					c2 === pc ||
					!set.has(c2) ||
					(!pc.startsWith("t") && !c.startsWith("t") && !c2.startsWith("t"))
				)
					continue;
				const key = [pc, c, c2].sort().join("-");
				connectionSet.add(key);
			}
		}
	}

	const connections = connectionSet.size;

	return { connections };
};

if (!config.isTest) {
	console.time("aoc-2024-day-23");
	const input = await readFile(path.join(day23Path, "input.txt"), "utf-8");
	const res = aoc2024Day23(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-23");
}
