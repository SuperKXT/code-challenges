import { readFile } from 'fs/promises';
import path from 'path';

export const campCleanup = async (
	override?: string
): Promise<{
	overlap: number;
	fullOverlap: number;
}> => {
	const input =
		override ?? (await readFile(path.join(__dirname, 'input.txt'), 'utf-8'));

	return input.split('\n').reduce(
		(object, row) => {
			if (!row) return object;

			const [elfA, elfB] = row.split(',');
			const [elfAStart = 0, elfAEnd = 0] = elfA?.split('-').map(Number) ?? [];
			const [elfBStart = 0, elfBEnd = 0] = elfB?.split('-').map(Number) ?? [];

			const isAInB = elfAStart >= elfBStart && elfAEnd <= elfBEnd;
			const isBInA = elfBStart >= elfAStart && elfBEnd <= elfAEnd;
			const isOverlap = elfAStart <= elfBEnd && elfBStart <= elfAEnd;

			if (isOverlap) object.overlap++;
			if (isAInB || isBInA) object.fullOverlap++;

			return object;
		},
		{ fullOverlap: 0, overlap: 0 }
	);
};
