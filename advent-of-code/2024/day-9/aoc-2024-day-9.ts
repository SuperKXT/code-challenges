import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../../../config.js";

export const day9Path = path.join(
	config.dirname,
	"advent-of-code",
	"2024",
	"day-9",
);

const getChecksum = (disk: string[]) => {
	let checksum = 0;
	for (let i = 0; i < disk.length; i++) {
		const curr = disk[i];
		const id = Number(curr);
		if (Number.isNaN(id)) continue;
		checksum += id * i;
	}
	return checksum;
};

export const aoc2024Day9 = (input: string) => {
	const trimmed = input.trim();
	const spacesToFill = new Set<number>();
	const compactSpaces: { idx: number; size: number }[] = [];
	const files: { id: number; idx: number }[] = [];
	const compactFiles: { id: number; idx: number; size: number }[] = [];
	const disk: string[] = [];
	let fileId = 0;
	let idx = 0;
	let isFile = true;
	for (const curr of trimmed) {
		const size = Number(curr);
		if (Number.isNaN(size)) continue;
		if (isFile) compactFiles.unshift({ id: fileId, idx, size });
		else compactSpaces.push({ idx, size });
		for (let i = 0; i < size; i++) {
			if (isFile) {
				files.push({ id: fileId, idx });
				disk.push(fileId.toString());
			} else {
				spacesToFill.add(idx);
				disk.push(".");
			}
			idx++;
		}
		if (isFile) fileId++;
		isFile = !isFile;
	}

	const frag = [...disk];
	for (const spaceIdx of spacesToFill) {
		const file = files.pop();
		if (!file) throw new Error("bad input");
		if (file.idx <= spaceIdx) break;
		frag[spaceIdx] = file.id.toString();
		frag[file.idx] = ".";
	}

	const fragChecksum = getChecksum(frag);

	const defrag = [...disk];
	for (const file of compactFiles) {
		for (const space of compactSpaces) {
			if (space.idx >= file.idx) break;
			if (space.size < file.size) continue;
			for (let i = 0; i < file.size; i++) {
				defrag[space.idx + i] = file.id.toString();
				defrag[file.idx + i] = ".";
			}
			space.idx += file.size;
			space.size -= file.size;
			break;
		}
	}

	const defragChecksum = getChecksum(defrag);

	return { fragChecksum, defragChecksum };
};

if (!config.isTest) {
	console.time("aoc-2024-day-9");
	const input = await readFile(path.join(day9Path, "input.txt"), "utf-8");
	const res = aoc2024Day9(input);
	console.info(res);
	console.timeEnd("aoc-2024-day-9");
}
