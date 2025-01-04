import { readFile } from "node:fs/promises";
import path from "node:path";

import { aoc2024Day10, day10Path } from "./aoc-2024-day-10.js";

test("testing aoc-2024-day-10 with sample ", async () => {
	const input = await readFile(path.join(day10Path, "sample.txt"), "utf-8");
	const res = aoc2024Day10(input);
	expect(res.summits).toBe(36);
	expect(res.treks).toBe(81);
});

test("testing aoc-2024-day-10 with input ", async () => {
	const input = await readFile(path.join(day10Path, "input.txt"), "utf-8");
	const res = aoc2024Day10(input);
	expect(res.summits).toBe(512);
	expect(res.treks).toBe(1045);
});
