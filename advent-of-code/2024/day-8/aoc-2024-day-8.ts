import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day8Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-8",
);

export const aoc2024Day8 = (input: string) => {
	const rowStrings = input.split("\n");
	const rows = rowStrings.length;
	const cols = rowStrings[0]?.length ?? 0;
	if (!rows || !cols) throw new Error("Invalid input");
	const nodes = new Map<string, [number, number][]>();
	const grid: string[][] = [];
	for (let x = 0; x < rows; x++) {
		const rowStr = rowStrings[x];
		if (!rowStr?.trim()) continue;
		const row = grid[x] ?? [];
		if (!grid[x]) grid[x] = row;
		for (let y = 0; y < cols; y++) {
			const curr = rowStr[y];
			if (!curr) continue;
			row[y] = curr;
			if (curr === ".") continue;
			const existing = nodes.get(curr);
			if (existing) existing.push([x, y]);
			else nodes.set(curr, [[x, y]]);
		}
	}

	const antiNodeSet = new Set<string>();
	const adjustedAntiNodeSet = new Set<string>();
	for (const node of nodes.values()) {
		for (const start of node) {
			const [startX, startY] = start;
			for (const end of node) {
				const [endX, endY] = end;
				if (startX === endX && startY === endY) continue;
				const xDiff = endX - startX;
				const yDiff = endY - startY;
				const xDiffAbs = Math.abs(endX - startX);
				const yDiffAbs = Math.abs(endY - startY);
				const x1 = startX < endX ? startX - xDiffAbs : startX + xDiffAbs;
				const y1 = startY < endY ? startY - yDiffAbs : startY + yDiffAbs;
				const row1 = grid[x1];
				if (row1?.[y1]) {
					antiNodeSet.add(`${x1},${y1}`);
					row1[y1] = "#";
				}

				const x2 = startX < endX ? endX + xDiffAbs : endX - xDiffAbs;
				const y2 = startY < endY ? endY + yDiffAbs : endY - yDiffAbs;
				const row2 = grid[x2];
				if (row2?.[y2]) {
					antiNodeSet.add(`${x2},${y2}`);
					row2[y2] = "#";
				}

				// adjusted calculation

				adjustedAntiNodeSet.add(`${startX},${startY}`);
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				grid[startX]![startY] = "#";
				adjustedAntiNodeSet.add(`${endX},${endY}`);
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				grid[endX]![endY] = "#";
				const x1Count = Math.floor(
					(xDiff > 0 ? startX : rows - startX) / xDiffAbs,
				);
				const y1Count = Math.floor(
					(yDiff > 0 ? startY : cols - startY) / yDiffAbs,
				);
				for (let i = 1; i <= Math.min(x1Count, y1Count); i++) {
					const currX =
						xDiff > 0 ? startX - i * xDiffAbs : startX + i * xDiffAbs;
					const currY =
						yDiff > 0 ? startY - i * yDiffAbs : startY + i * yDiffAbs;
					if (!grid[currX]?.[currY]) continue;
					adjustedAntiNodeSet.add(`${currX},${currY}`);
					grid[currX][currY] = "#";
				}

				const x2Count = Math.floor((xDiff > 0 ? rows - endX : endX) / xDiffAbs);
				const y2Count = Math.floor((yDiff > 0 ? cols - endY : endY) / yDiffAbs);

				for (let i = 1; i <= Math.min(x2Count, y2Count); i++) {
					const currX = xDiff > 0 ? endX + i * xDiffAbs : endX - i * xDiffAbs;
					const currY = yDiff > 0 ? endY + i * yDiffAbs : endY - i * yDiffAbs;
					if (!grid[currX]?.[currY]) continue;
					adjustedAntiNodeSet.add(`${currX},${currY}`);
					grid[currX][currY] = "#";
				}
			}
		}
	}

	return {
		antiNodes: antiNodeSet.size,
		adjustedAntiNodes: adjustedAntiNodeSet.size,
	};
};

if (!config.isTest) {
	console.time("aoc-2024-day-8");
	const input = await readFile(path.join(day8Path, "input.txt"), "utf-8");
	const res = aoc2024Day8(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-8");
}
