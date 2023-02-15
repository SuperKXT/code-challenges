import { objectValues } from '~/helpers/object';

const totalSpace = 70_000_000;
const requiredSpace = 30_000_000;
const smallSize = 100_000;

export const raumdeuter = (
	input: string
): {
	smallFiles: number;
	deletedSize: number;
} => {
	const dirs: Record<string, number> = {};
	const currentDirs: string[] = [];

	for (const row of input.split('\n')) {
		if (!row) continue;

		const [first, second, third] = row.split(' ');

		if (first === '$' && second === 'cd' && third) {
			if (third === '..') {
				currentDirs.pop();
				continue;
			}
			const last = currentDirs.at(-1);
			const name = `${last && last !== '/' ? `${last}/` : ''}${third}`;
			currentDirs.push(name);
			dirs[name] = 0;
			continue;
		}

		const size = Number(first);
		if (currentDirs && !isNaN(size)) {
			currentDirs.forEach((dir) => (dirs[dir] += size));
		}
	}

	const sizes = objectValues(dirs).sort((a, b) => a - b);
	const takenSpace = sizes.at(-1) ?? 0;
	const unusedSpace = totalSpace - takenSpace;
	const toFree = requiredSpace - unusedSpace;

	const solution = {
		smallFiles: 0,
		deletedSize: 0,
	};

	for (const size of sizes) {
		if (size <= smallSize) solution.smallFiles += size;
		if (size > smallSize && solution.deletedSize) break;
		if (!solution.deletedSize && size >= toFree) solution.deletedSize = size;
	}

	return solution;
};
