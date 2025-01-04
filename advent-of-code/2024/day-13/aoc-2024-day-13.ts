import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day13Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-13",
);

const coordRegex = /(?<=(?:X\+|=)|(?:Y\+|=))\d+/gu;

const getCoords = (s: string): [number, number] => {
	const matches = s.match(coordRegex);
	const x = parseInt(matches?.[0] ?? "");
	const y = parseInt(matches?.[1] ?? "");
	if (isNaN(x) || isNaN(y)) throw new Error(`Invalid coord string`);
	return [x, y];
};

type TCoord = [x: number, y: number];
type TMachine = { a: TCoord; b: TCoord; prize: TCoord };

/*
	Button A: X+94, Y+34
	Button B: X+22, Y+67
	Prize: X=8400, Y=5400

	EITHER 94 * x + 22 * y = 8400
	OR 34 * x + 67 * y = 5400

	x = (8400 - 22 * y) / 94
	x = (5400 - 67 * y) / 34
	(8400 - 22 * y) / 94  = (5400 - 67 * y) / 34
	8400 * 34 - 22 * y * 34 = 5400 * 94 - 67 * y * 94
	(67 * y * 94) - (22 * y * 34) = (5400 * 94) - (8400 * 34)
	(6298 * y) - (748 * y) = (507600) - (285600)
	y * (6298  - 748) = 222000;
	y * 5550 = 222000;
	y = 222000 / 5550;
	y = 40;
	x = (8400 - 22 * 40) / 94
	x = 80

	Eq1 =>
		A[X] * x + B[X] * y = Prize[X]
		x = (Prize[X] - B[X] * y) / A[X]
	Eq2 =>
		A[Y] * x + B[Y] * y = Prize[Y]
		x = (Prize[Y] - B[Y] * y) / A[Y]

	(Prize[X] - B[X] * y) / A[X] = (Prize[Y] - B[Y] * y) / A[Y]
	(Prize[X] - B[X] * y) * A[Y] = (Prize[Y] - B[Y] * y) * A[X]
	(Prize[X] * A[Y]) - (B[X] * A[Y] * y) = (Prize[Y] * A[X]) - (B[Y] * A[X] * y)
	(B[Y] * A[X] * y) - (B[X] * A[Y] * y) = (Prize[Y] * A[X]) - (Prize[X] * A[Y])
	y * ((B[Y] * A[X]) - (B[X] * A[Y])) = (Prize[Y] * A[X]) - (Prize[X] * A[Y])
	y = (Prize[Y] * A[X]) - (Prize[X] * A[Y]) / ((B[Y] * A[X]) - (B[X] * A[Y]))
*/
const toAdd = 10_000_000_000_000;
const getTokens = (machine: TMachine, adjust: boolean): number => {
	const { a, b } = machine;
	const prize: TCoord = adjust
		? [machine.prize[0] + toAdd, machine.prize[1] + toAdd]
		: machine.prize;
	const y = (prize[1] * a[0] - prize[0] * a[1]) / (b[1] * a[0] - b[0] * a[1]);
	const x = (prize[0] - b[0] * y) / a[0];
	if (!Number.isInteger(x) || !Number.isInteger(y)) return 0;
	return x * 3 + y;
};

export const aoc2024Day13 = (input: string) => {
	const machines = input
		.trim()
		.split("\n\n")
		.map((s) => {
			const lines = s.split("\n");
			const a = getCoords(lines[0] ?? "");
			const b = getCoords(lines[1] ?? "");
			const prize = getCoords(lines[2] ?? "");
			return { a, b, prize };
		});

	let tokens = 0;
	let adjustedTokens = 0;
	for (const row of machines) {
		tokens += getTokens(row, false);
		adjustedTokens += getTokens(row, true);
	}

	return { tokens, adjustedTokens };
};

if (!config.isTest) {
	console.time("aoc-2024-day-13");
	const input = await readFile(path.join(day13Path, "input.txt"), "utf-8");
	const res = aoc2024Day13(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-13");
}
