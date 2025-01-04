import { readFile } from "node:fs/promises";
import path from "node:path";

import { aoc2024Day8, day8Path } from "./aoc-2024-day-8.js";

test("testing aoc-2024-day-8 with sample ", async () => {
	const input = await readFile(path.join(day8Path, "sample.txt"), "utf-8");
	const res = aoc2024Day8(input);
	expect(res.antiNodes).toBe(14);
	expect(res.adjustedAntiNodes).toBe(34);
});

test("testing aoc-2024-day-8 with input ", async () => {
	const input = await readFile(path.join(day8Path, "input.txt"), "utf-8");
	const res = aoc2024Day8(input);
	expect(res.antiNodes).toBe(240);
	expect(res.adjustedAntiNodes).toBe(955);
});
