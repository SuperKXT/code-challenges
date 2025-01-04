/* eslint-disable no-bitwise */
import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day17Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-17",
);

type TRegisters = { a: number; b: number; c: number };

const combo = (operand: number, registers: TRegisters) => {
	switch (operand) {
		case 0:
		case 1:
		case 2:
		case 3: {
			return operand;
		}
		case 4: {
			return registers.a;
		}
		case 5: {
			return registers.b;
		}
		case 6: {
			return registers.c;
		}
		default: {
			throw new Error("Invalid input");
		}
	}
};

export const aoc2024Day17 = (input: string) => {
	const output: string[] = [];
	const res = input.match(/[\d,]+/gu);
	const a = Number(res?.[0]);
	const b = Number(res?.[1]);
	const c = Number(res?.[2]);
	const program = res?.[3]
		?.trim()
		.split(",")
		.map((s) => Number(s));
	if (isNaN(a) || isNaN(b) || isNaN(c) || !program?.length)
		throw new Error("Invalid input");
	const registers: TRegisters = { a, b, c };
	let pointer = 0;
	pr: while (pointer < program.length) {
		const op = program[pointer];
		const operand = program[pointer + 1];
		if (op === undefined || operand === undefined)
			throw new Error("Invalid input");
		switch (op) {
			case 0: {
				// adv
				registers.a = Math.trunc(registers.a / 2 ** combo(operand, registers));
				break;
			}
			case 1: {
				// bxl
				registers.b ^= operand;
				break;
			}
			case 2: {
				// bst
				registers.b = combo(operand, registers) % 8;
				break;
			}
			case 3: {
				// jnz
				if (!registers.a) break;
				pointer = operand;
				continue pr;
			}
			case 4: {
				// bxc
				registers.b ^= registers.c;
				break;
			}
			case 5: {
				// out
				const val = (combo(operand, registers) % 8).toString();
				// console.log(operand, registers, val);
				output.push(val);
				break;
			}
			case 6: {
				// bdv
				registers.b = Math.trunc(registers.a / 2 ** combo(operand, registers));
				break;
			}
			case 7: {
				// cdv
				registers.c = Math.trunc(registers.a / 2 ** combo(operand, registers));
				break;
			}
			default:
				throw new Error("Invalid input");
		}
		pointer += 2;
	}

	return { output: output.join(",") };
};

if (!config.isTest) {
	console.time("aoc-2024-day-17");
	const input = await readFile(path.join(day17Path, "input.txt"), "utf-8");
	const res = aoc2024Day17(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-17");
}
