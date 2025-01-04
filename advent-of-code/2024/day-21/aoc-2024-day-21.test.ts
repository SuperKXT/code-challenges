import { readFile } from "node:fs/promises";
import path from "node:path";

import { aoc2024Day21, day21Path } from "./aoc-2024-day-21.js";

test("testing aoc-2024-day-21 with sample ", async () => {
	const input = await readFile(path.join(day21Path, "sample.txt"), "utf-8");
	const res = aoc2024Day21(input);
	expect(res.complexity).toBe(126384);
});

test("testing aoc-2024-day-21 with input ", async () => {
	const input = await readFile(path.join(day21Path, "input.txt"), "utf-8");
	const res = aoc2024Day21(input);
	expect(res.complexity).toBe(209);
});
