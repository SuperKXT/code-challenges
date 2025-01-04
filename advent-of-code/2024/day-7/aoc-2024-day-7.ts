import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day7Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-7",
);

const getResults = (
	operands: number[],
	includeConcat?: boolean,
	prevResult: number = 0,
): number[] => {
	const [operand, ...rest] = operands;
	if (!operand) {
		return [prevResult];
	}
	const sum = getResults(rest, includeConcat, prevResult + operand);
	const prod = getResults(rest, includeConcat, prevResult * operand);
	const concat = includeConcat
		? getResults(rest, includeConcat, Number(`${prevResult}${operand}`))
		: [];
	return [...sum, ...prod, ...concat];
};

export const aoc2024Day7 = (input: string) => {
	let sumAndProdCount = 0;
	let totalCount = 0;
	for (const line of input.split("\n")) {
		if (!line.trim()) continue;
		const s = line.split(":");
		const result = Number(s[0]?.trim());
		if (!result) throw new Error("Invalid equation");
		const operands =
			s[1]
				?.trim()
				.split(" ")
				.map((n) => {
					const num = Number(n);
					if (!num) throw new Error("Invalid operand");
					return num;
				}) ?? [];
		if (!operands.length) throw new Error("No operands found");
		const sumAndProdEqs = getResults(operands).filter(
			(r) => r === result,
		).length;
		const totalEqs = getResults(operands, true).filter(
			(r) => r === result,
		).length;
		if (sumAndProdEqs > 0) sumAndProdCount += result;
		if (totalEqs > 0) totalCount += result;
	}

	return { sumAndProdCount, totalCount };
};

if (!config.isTest) {
	console.time("aoc-2024-day-7");
	const input = await readFile(path.join(day7Path, "input.txt"), "utf-8");
	const res = aoc2024Day7(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-7");
}
