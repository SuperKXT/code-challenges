import { readFile } from "node:fs/promises";
import path from "node:path";

import { aoc2024Day5 } from "./aoc-2024-day-5.js";

import { config } from "../../../config.js";

const dirname = path.join(config.dirname, "advent-of-code", "2024", "day-5");

test("testing aoc-2024-day-5", async () => {
	const sample = await readFile(path.join(dirname, "sample.txt"), "utf-8");
	const sampleRes = aoc2024Day5(sample);
	expect(sampleRes.correctSum).toBe(143);
	expect(sampleRes.incorrectSum).toBe(123);

	const input = await readFile(path.join(dirname, "input.txt"), "utf-8");
	const response = aoc2024Day5(input);
	expect(response.correctSum).toBe(5948);
	expect(response.incorrectSum).toBe(3062);
});
