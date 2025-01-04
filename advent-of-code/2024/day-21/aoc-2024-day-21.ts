import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day21Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-21",
);

type TCoord = [number, number];

type TPad = Map<string, TCoord>;

const getPath = (pad: TPad, position: string, target: string) => {
	const curr = Array.from(pad.get(position) ?? []) as TCoord;
	const to = pad.get(target);
	const voidCoords = pad.get(".");
	if (!to || !voidCoords) throw new Error("Invalid position");
	const pathArr: string[] = [];
	while (curr[1] !== to[1]) {
		const direction = curr[1] < to[1] ? ">" : "<";
		const nextX = curr[1] + (direction === ">" ? 1 : -1);
		if (voidCoords[0] === curr[0] && voidCoords[1] === nextX) {
			const yDirection = curr[0] < to[0] ? "v" : "^";
			const nextY = curr[0] + (yDirection === "v" ? 1 : -1);
			pathArr.push(yDirection);
			curr[0] = nextY;
		}
		pathArr.push(direction);
		curr[1] = nextX;
	}
	while (curr[0] !== to[0]) {
		const direction = curr[0] < to[0] ? "v" : "^";
		const nextY = curr[0] + (direction === "v" ? 1 : -1);
		pathArr.push(direction);
		curr[0] = nextY;
	}
	pathArr.push("A");
	return pathArr;
};

const numPad: TPad = new Map([
	["7", [0, 0]],
	["8", [0, 1]],
	["9", [0, 2]],
	["4", [1, 0]],
	["5", [1, 1]],
	["6", [1, 2]],
	["1", [2, 0]],
	["2", [2, 1]],
	["3", [2, 2]],
	[".", [3, 0]],
	["0", [3, 1]],
	["A", [3, 2]],
]);

const movePad: TPad = new Map([
	[".", [0, 0]],
	["^", [0, 1]],
	["A", [0, 2]],
	["<", [1, 0]],
	["v", [1, 1]],
	[">", [1, 2]],
]);

export const aoc2024Day21 = (input: string) => {
	const codes = input.trim().split("\n").filter(Boolean);
	if (!codes.length) throw new Error("Invalid input");

	let complexity = 0;
	for (const code of codes) {
		let numPadCurr = "A";
		const movePad1Path: string[] = [];
		for (const char of code) {
			movePad1Path.push(...getPath(numPad, numPadCurr, char));
			numPadCurr = char;
		}

		let movePad1Curr = "A";
		const movePad2Path: string[] = [];
		for (const char of movePad1Path) {
			movePad2Path.push(...getPath(movePad, movePad1Curr, char));
			movePad1Curr = char;
		}

		let movePad2Curr = "A";
		const movePad3Path: string[] = [];
		for (const char of movePad2Path) {
			movePad3Path.push(...getPath(movePad, movePad2Curr, char));
			movePad2Curr = char;
		}

		const len = movePad3Path.length;
		complexity += len * parseInt(code);
	}

	return { complexity };
};

if (!config.isTest) {
	console.time("aoc-2024-day-21");
	const input = await readFile(path.join(day21Path, "input.txt"), "utf-8");
	const res = aoc2024Day21(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-21");
}
