import { readFile } from 'fs/promises';
import path from 'path';

export const campCleanup = async (
	override?: string
): Promise<number> => {

	const input = override ?? await readFile(
		path.join(__dirname, 'input.txt'),
		'utf-8'
	);

	let fullOverlap = 0;

	for (const row of input.split('\n')) {

		if (!row) continue;

		const [elfA, elfB] = row.split(',');
		const [elfAStart = 0, elfAEnd = 0] = elfA?.split('-').map(Number) ?? [];
		const [elfBStart = 0, elfBEnd = 0] = elfB?.split('-').map(Number) ?? [];

		const isAInB = (
			elfAStart >= elfBStart
			&& elfAEnd <= elfBEnd
		);
		const isBInA = (
			elfBStart >= elfAStart
			&& elfBEnd <= elfAEnd
		);
		if (
			isAInB
			|| isBInA
		) fullOverlap++;

	}

	return fullOverlap;

};
