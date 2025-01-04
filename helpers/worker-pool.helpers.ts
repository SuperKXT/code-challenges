import os from "node:os";
import { Worker } from "node:worker_threads";

export type TWorkerPoolRes<T> = (({ error: null } & T) | { error: string })[];

export class WorkerPool<TArgs, TReturn> {
	private workerPath: string;
	private maxWorkers = os.cpus().length;

	constructor(workerPath: string) {
		this.workerPath = workerPath;
	}

	async runTasks(tasks: TArgs[]): Promise<TWorkerPoolRes<TReturn>> {
		if (!tasks.length) throw new Error("No tasks to run!");

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

		worker.on("message", (result) => {
			worker.terminate();
			resolve(result as never);
		});

		worker.on("error", (err) => {
			worker.terminate();
			reject(err);
		});

		// eslint-disable-next-line @typescript-eslint/return-await
		return promise;
	}
}
