import { readFile } from 'fs/promises';
import path from 'path';

const lowerCase = 'abcdefghijklmnopqrstuvwxyz' as const;
const upperCase = lowerCase.toUpperCase() as Uppercase<typeof lowerCase>;
const items = `${lowerCase}${upperCase}` as const;

export const rucksackReorganization = async (
	override?: string
): Promise<{
	commonPriority: number;
	badgePriority: number;
}> => {
	const input =
		override ?? (await readFile(path.join(__dirname, 'input.txt'), 'utf-8'));

	let commonPriority = 0;
	let badgePriority = 0;
	const group: string[] = [];

	for (const row of input.split('\n')) {
		if (!row) continue;

		if (group.length < 3) group.push(row);

		if (group.length === 3) {
			const badge = Array.from(group[0] ?? '').find((item) =>
				group.slice().every((elf) => elf.includes(item))
			);
			badgePriority += items.indexOf(badge ?? ' ') + 1;
			group.splice(0, 3);
		}

		const firstHalf = row.slice(0, row.length / 2);
		const secondHalf = row.slice(row.length / 2);
		const common = Array.from(firstHalf).find((item) =>
			secondHalf.includes(item)
		);
		commonPriority += items.indexOf(common ?? ' ') + 1;
	}

	return {
		badgePriority,
		commonPriority,
	};
};
