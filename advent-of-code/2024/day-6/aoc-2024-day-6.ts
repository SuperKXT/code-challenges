import { readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { Worker } from 'node:worker_threads';

import { cellEnum, dirname } from './enums.js';

import { config } from '../../../config.js';

export type TCell = (typeof cellEnum)[keyof typeof cellEnum];
export type TGrid = TCell[][];

export type TWalkGridArgs = { grid: TGrid; start: { x: number; y: number } };

export type TWalkGridRes = { count: number };

export type TWorkerPoolRes<T> = (({ error: null } & T) | { error: string })[];

class WorkerPool<TArgs, TReturn> {
	private workerPath: string;
	private maxWorkers = os.cpus().length;

	constructor(workerPath: string) {
		this.workerPath = workerPath;
	}

	async runTasks(tasks: TArgs[]): Promise<TWorkerPoolRes<TReturn>> {
		if (!tasks.length) throw new Error('No tasks to run!');

		let currChunk: TArgs[] = [];
		const chunks: TArgs[][] = [currChunk];
		const maxSize = Math.ceil(tasks.length / this.maxWorkers);
		let size = 0;
		for (const task of tasks) {
			if (size >= maxSize) {
				size = 0;
				currChunk = [];
				chunks.push(currChunk);
			}
			currChunk.push(task);
			size++;
		}

		const chunkRes = await Promise.all(
			chunks.map(async (a) => await this.startWorker(a)),
		);
		return chunkRes.flat();
	}

	private async startWorker(tasks: TArgs[]) {
		const { promise, resolve, reject } =
			Promise.withResolvers<TWorkerPoolRes<TReturn>>();
		const worker = new Worker(this.workerPath, { workerData: tasks });

		worker.on('message', (result) => {
			worker.terminate();
			resolve(result as never);
		});

		worker.on('error', (err) => {
			worker.terminate();
			reject(err);
		});

		// eslint-disable-next-line @typescript-eslint/return-await
		return promise;
	}
}

export const aoc2024Day6 = async (input: string) => {
	const grid: TGrid = [];
	const start = { x: 0, y: 0 };
	let rowIdx = 0;
	for (const row of input.split('\n')) {
		if (!row.trim()) continue;
		const startIdx = row.indexOf('^');
		if (startIdx !== -1) {
			start.x = rowIdx;
			start.y = startIdx;
		}
		grid.push(row.trim().split('') as TCell[]);
		rowIdx++;
	}

	const pool = new WorkerPool<TWalkGridArgs, TWalkGridRes>(
		path.join(dirname, 'walk-grid-worker.js'),
	);

	const [res] = await pool.runTasks([{ grid, start }]);
	const count = res?.error === null ? res.count : 0;

	const tasks: TWalkGridArgs[] = [];
	for (let x = 0; x < grid.length; x++) {
		const row = grid[x];
		if (!row) continue;
		for (let y = 0; y < row.length; y++) {
			const curr = row[y];
			if (curr !== cellEnum.empty) continue;
			const candidate = grid.map((r, xI) =>
				r.map((c, yI) => (xI === x && yI === y ? cellEnum.obstruction : c)),
			);
			tasks.push({ grid: candidate, start });
		}
	}

	const tasksRes = await pool.runTasks(tasks);
	const obstructionCount = tasksRes.filter((r) => r.error !== null).length;

	return { count, obstructionCount };
};

if (!config.isTest) {
	console.time('aoc-2024-day-6');
	const input = await readFile(
		path.join(config.dirname, 'advent-of-code', '2024', 'day-6', 'input.txt'),
		'utf-8',
	);
	const res = await aoc2024Day6(input);
	console.info(res);
	console.timeEnd('aoc-2024-day-6');
}
