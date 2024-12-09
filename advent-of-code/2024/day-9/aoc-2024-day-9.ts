import path from 'path';

import { config } from '../../../config.js';

export const day9Path = path.join(
	config.dirname,
	'advent-of-code',
	'2024',
	'day-9',
);

export const aoc2024Day9 = (input: string) => {
	const trimmed = input.trim();
	const spacesToFill = new Set<number>();
	const files: { id: number; idx: number }[] = [];
	const defrag: string[] = [];
	let fileId = 0;
	let idx = 0;
	let isFile = true;
	for (const curr of trimmed) {
		const size = Number(curr);
		if (Number.isNaN(size)) continue;
		for (let i = 0; i < size; i++) {
			if (isFile) {
				files.push({ id: fileId, idx });
				defrag.push(fileId.toString());
			} else {
				spacesToFill.add(idx);
				defrag.push('.');
			}
			idx++;
		}
		if (isFile) fileId++;
		isFile = !isFile;
	}

	for (const spaceIdx of spacesToFill) {
		const file = files.pop();
		if (!file) throw new Error('bad input');
		if (file.idx <= spaceIdx) break;
		defrag[spaceIdx] = file.id.toString();
		defrag[file.idx] = '.';
	}

	let checksum = 0;
	for (let i = 0; i < defrag.length; i++) {
		const curr = defrag[i];
		const id = Number(curr);
		if (Number.isNaN(id)) break;
		checksum += id * i;
	}

	return {
		checksum,
	};
};

if (!config.isTest) {
	console.time('aoc-2024-day-9');
	const res = aoc2024Day9(path.join(day9Path, 'input.txt'));
	console.info(res);
	console.timeEnd('aoc-2024-day-9');
}
