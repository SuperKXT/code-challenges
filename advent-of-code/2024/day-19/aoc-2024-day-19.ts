import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day19Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-19",
);

const checkDesign = (
	design: string,
	towels: string[],
	map: Map<string, number>,
): number => {
	if (design === "") return 1;
	const existing = map.get(design);
	if (existing !== undefined) return existing;
	let count = 0;
	for (const towel of towels) {
		if (!design.startsWith(towel)) continue;
		const curr = checkDesign(design.slice(towel.length), towels, map);
		count += curr;
	}
	map.set(design, count);
	return count;
};

export const aoc2024Day19 = (input: string) => {
	const [towelStr, ...designs] = input.trim().split("\n").filter(Boolean);
	if (!towelStr || !designs.length) throw new Error("Invalid input");
	const countMap = new Map<string, number>();
	const towels = towelStr.split(",").map((r) => r.trim());
	let count = 0;
	let totalCount = 0;
	for (const design of designs) {
		const curr = checkDesign(design.trim(), towels, countMap);
		totalCount += curr;
		if (curr > 0) count++;
	}

	return { count, totalCount };
};

if (!config.isTest) {
	console.time("aoc-2024-day-19");
	const input = await readFile(path.join(day19Path, "input.txt"), "utf-8");
	const res = aoc2024Day19(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-19");
}
