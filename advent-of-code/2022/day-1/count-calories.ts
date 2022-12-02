import { readFile } from 'fs/promises';
import path from 'path';

export const countCalories = async (): Promise<[number, number]> => {

	const input = await readFile(
		path.join(__dirname, 'input.txt'),
		'utf-8'
	);

	const calories = input.split('\n\n').map(elf =>
		elf.split('\n').map(Number).reduce(
			(sum, calories) => sum += calories
			, 0
		)
	);
	const maxCalories = Math.max(...calories);
	const maxIndex = calories.indexOf(maxCalories);

	return [maxIndex, maxCalories];

};
