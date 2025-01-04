import { objectValues } from "../../../helpers/object.helpers.js";

const TOTAL_SPACE = 70_000_000;
const REQUIRED_SPACE = 30_000_000;
const SMALL_SIZE = 100_000;

export const raumdeuter = (
	input: string,
): {
	smallFiles: number;
	deletedSize: number;
} => {
	const dirs: Record<string, number> = {};
	const currentDirs: string[] = [];

	for (const row of input.split("\n")) {
		if (!row) continue;

		const [first, second, third] = row.split(" ");

		if (first === "$" && second === "cd" && third) {
			if (third === "..") {
				currentDirs.pop();
				continue;
			}
			const last = currentDirs.at(-1);
			const name = `${last && last !== "/" ? `${last}/` : ""}${third}`;
			currentDirs.push(name);
			dirs[name] = 0;
			continue;
		}

		const size = Number(first);
		if (currentDirs.length && !isNaN(size)) {
			currentDirs.forEach((dir) => {
				dirs[dir] = (dirs[dir] ?? 0) + size;
			});
		}
	}

	const sizes = objectValues(dirs).sort((first, second) => first - second);
	const takenSpace = sizes.at(-1) ?? 0;
	const unusedSpace = TOTAL_SPACE - takenSpace;
	const toFree = REQUIRED_SPACE - unusedSpace;

	const solution = {
		deletedSize: 0,
		smallFiles: 0,
	};

	for (const size of sizes) {
		if (size <= SMALL_SIZE) solution.smallFiles += size;

		if (size > SMALL_SIZE && solution.deletedSize) break;

		if (!solution.deletedSize && size >= toFree) solution.deletedSize = size;
	}

	return solution;
};
