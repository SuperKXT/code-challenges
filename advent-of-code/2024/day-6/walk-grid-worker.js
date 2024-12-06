import { parentPort, workerData } from 'node:worker_threads';

import { cellEnum, nextMap } from './enums.js';

if (!parentPort) {
	throw new Error('This script must be run as a Worker thread');
}

/** @type {(args: import("./aoc-2024-day-6.js").TWalkGridArgs) => import("./aoc-2024-day-6.js").TWalkGridRes} */
const walkGrid = (args) => {
	const { grid, start } = args;
	const walked = grid.map((r) => [...r]);
	/** @type {import("./enums.js").TDirection} */
	let direction = cellEnum.up;
	let coords = { ...start };
	let count = 0;
	/** @type {Set<string>} */
	const walkSet = new Set();
	while (true) {
		const row = walked[coords.x];
		if (!row) break;
		const cell = row[coords.y];
		if (!cell) break;
		else if (cell !== cellEnum.visited) {
			count++;
			row[coords.y] = cellEnum.visited;
		}

		const currWalk = `x:${coords.x},y:${coords.y},direction:${direction}`;
		if (walkSet.has(currWalk)) throw new Error('loop');
		else walkSet.add(currWalk);

		const nextCoords = { ...coords };
		if (direction === cellEnum.up) nextCoords.x--;
		else if (direction === cellEnum.right) nextCoords.y++;
		else if (direction === cellEnum.down) nextCoords.x++;
		else nextCoords.y--;
		const next = walked[nextCoords.x]?.[nextCoords.y];
		if (!next) break;
		if (next === cellEnum.obstruction) {
			direction = nextMap[direction];
		} else {
			coords = nextCoords;
		}
	}
	return { count };
};

/** @type {import("./aoc-2024-day-6.js").TWalkGridArgs[]} */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const args = workerData;

/** @type {import("./aoc-2024-day-6.js").TWorkerPoolRes<import("./aoc-2024-day-6.js").TWalkGridRes>} */
const message = [];

for (const arg of args) {
	try {
		const r = walkGrid(arg);
		message.push({ error: null, ...r });
	} catch (err) {
		message.push({ error: String(err) });
	}
}

parentPort.postMessage(message);
