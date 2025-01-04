import { readFile } from "node:fs/promises";
import path from "node:path";

import {
	aoc2024Day15Part1,
	aoc2024Day15Part2,
	day15Path,
} from "./aoc-2024-day-15.js";

test("testing aoc-2024-day-15 with sample ", async () => {
	const input = await readFile(path.join(day15Path, "sample.txt"), "utf-8");
	const res = aoc2024Day15Part1(input);
	expect(res.sum).toBe(10092);
	expect(aoc2024Day15Part2(input).sum).toBe(9021);
});

test("testing aoc-2024-day-15 with sample-2 ", async () => {
	const input = await readFile(path.join(day15Path, "sample-2.txt"), "utf-8");
	const res = aoc2024Day15Part1(input);
	expect(res.sum).toBe(2028);
	expect(aoc2024Day15Part2(input).sum).toBe(1751);
});

test("testing aoc-2024-day-15 with input ", async () => {
	const input = await readFile(path.join(day15Path, "input.txt"), "utf-8");
	const res = aoc2024Day15Part1(input);
	expect(res.sum).toBe(1430439);
	expect(aoc2024Day15Part2(input).sum).toBe(1751);
});
