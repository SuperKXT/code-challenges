import { readFile } from "node:fs/promises";
import path from "node:path";

import { ropeBridge } from "./rope-bridge.js";

import { config } from "../../../config.js";

const EXAMPLE = ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"].join(
	"\n",
);

const EXAMPLE_2 = [
	"R 5",
	"U 8",
	"L 8",
	"D 3",
	"R 17",
	"D 10",
	"L 25",
	"U 20",
].join("\n");

type Solution = ReturnType<typeof ropeBridge>;

test("testing ropeBridge against example input", () => {
	const response = ropeBridge(EXAMPLE, {
		col: 0,
		row: 4,
	});
	const solution: Solution = {
		firstTail: 13,
		lastTail: 1,
	};
	expect(response).toStrictEqual(solution);
});

test("testing ropeBridge against 2nd example input", () => {
	const solution: Solution = {
		firstTail: 88,
		lastTail: 36,
	};
	expect(ropeBridge(EXAMPLE_2)).toStrictEqual(solution);
});

test("testing ropeBridge against real input", async () => {
	const input = await readFile(path.join(config.dirname, "input.txt"), "utf-8");
	const solution: Solution = {
		firstTail: 5902,
		lastTail: 2445,
	};
	expect(ropeBridge(input)).toStrictEqual(solution);
});
