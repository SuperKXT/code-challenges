import { readFile } from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

import { config } from "../../../config.js";
import { filterInPlace } from "../../../helpers/array.helpers.js";

export const day24Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-24",
);

const declareSchema = z.object({
	name: z.string(),
	val: z.preprocess((val) => {
		if (val === "1") return true;
		if (val === "0") return false;
		throw new Error("invalid value");
	}, z.boolean()),
});

const ops = ["AND", "OR", "XOR"] as const;

const eqSchema = z.object({
	v1: z.string(),
	v2: z.string(),
	res: z.string(),
	op: z.enum(ops),
	resolved: z.boolean().default(false),
});

type TEq = typeof eqSchema._output;

const declareRegex = /(?<name>.*):\s*(?<val>0|1)/u;

const eqRegex =
	/(?<v1>.*)\s+(?<op>(?:XOR)|(?:OR)|(?:AND))\s+(?<v2>.*)\s+->\s+(?<res>.*)/u;

const getRes = (v1: boolean, v2: boolean, op: TEq["op"]) => {
	const val = op === "AND" ? v1 && v2 : op === "OR" ? v1 || v2 : v1 !== v2;
	return val;
};

const solveEq = (
	map: Map<string, boolean>,
	resMap: Map<string, TEq>,
	eq: TEq,
) => {
	if (eq.resolved) return;
	let v1 = map.get(eq.v1);
	let v2 = map.get(eq.v2);
	if (v1 !== undefined && v2 !== undefined) {
		map.set(eq.res, getRes(v1, v2, eq.op));
		eq.resolved = true;
		return;
	}

	if (v1 === undefined) {
		const v1Eq = resMap.get(eq.v1);
		if (!v1Eq) return;
		solveEq(map, resMap, v1Eq);
		v1 = map.get(eq.v1);
	}
	if (v2 === undefined) {
		const v2Eq = resMap.get(eq.v2);
		if (!v2Eq) return;
		solveEq(map, resMap, v2Eq);
		v2 = map.get(eq.v2);
	}
	if (v1 === undefined || v2 === undefined) return;
	map.set(eq.res, getRes(v1, v2, eq.op));
	eq.resolved = true;
};

export const aoc2024Day24 = (input: string) => {
	const map = new Map<string, boolean>();
	const zSet = new Set<string>();
	const eqs: TEq[] = [];
	const resMap = new Map<string, TEq>();

	for (const r of input.split("\n")) {
		const row = r.trim();
		if (!row) continue;
		const declaration = declareRegex.exec(row);
		if (declaration) {
			const { name, val } = declareSchema.parse(declaration.groups);
			map.set(name, val);
			if (name.startsWith("z")) zSet.add(name);
		}
		const statement = eqRegex.exec(row);
		if (statement) {
			const eq = eqSchema.parse(statement.groups);
			const v1 = map.get(eq.v1);
			const v2 = map.get(eq.v2);
			const op = eq.op;
			if (eq.res.startsWith("z")) zSet.add(eq.res);
			if (v1 === undefined || v2 === undefined) {
				eqs.push(eq);
				resMap.set(eq.res, eq);
				continue;
			}
			const val = op === "AND" ? v1 && v2 : op === "OR" ? v1 || v2 : v1 !== v2;
			map.set(eq.res, val);
		}
	}

	while (eqs.length > 0) {
		const first = eqs[0];
		if (!first) break;
		solveEq(map, resMap, first);
		filterInPlace(eqs, (r) => !r.resolved);
	}

	let str = "";
	for (const key of Array.from(zSet).sort())
		str = `${Number(map.get(key))}${str}`;

	const output = parseInt(str, 2);

	return { output };
};

if (!config.isTest) {
	console.time("aoc-2024-day-24");
	const input = await readFile(path.join(day24Path, "sample.txt"), "utf-8");
	const res = aoc2024Day24(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-24");
}
