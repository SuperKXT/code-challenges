import { readFile } from 'fs/promises';
import path from 'path';

const lowerCase = 'abcdefghijklmnopqrstuvwxyz' as const;
const upperCase = lowerCase.toUpperCase() as Uppercase<typeof lowerCase>;
const items = `${lowerCase}${upperCase}` as const;

export const rucksackReorganization = async (
	override?: string
): Promise<number> => {

	const input = override ?? await readFile(
		path.join(__dirname, 'input.txt'),
		'utf-8'
	);

	return input.split('\n').reduce(
		(sum, row) => {
			if (!row) return sum;
			const firstHalf = row.slice(0, row.length / 2);
			const secondHalf = row.slice(row.length / 2);
			const common = Array.from(firstHalf).find(item =>
				secondHalf.includes(item)
			);
			return sum += items.indexOf(common ?? ' ') + 1;
		}
		, 0
	);

};
