import { readFile } from 'fs/promises';
import path from 'path';

export type CountCaloriesSolution = {
	maxIndex: number;
	maxCalories: number;
	topThreeIndexes: [number, number, number];
	topThreeCalories: number;
}

export const countCalories = async (): Promise<CountCaloriesSolution> => {
	const input = await readFile(path.join(__dirname, 'input.txt'), 'utf-8');

	const calories = input.split('\n\n').map((row) =>
		row
			.split('\n')
			.map(Number)
			.reduce((sum, current) => sum + current, 0)
	);
	const maxCalories = Math.max(...calories);
	const maxIndex = calories.indexOf(maxCalories);

	const topThree = [...calories]
		.sort((first, second) => second - first)
		.slice(0, 3);
	const topThreeIndexes = topThree.map((row) => calories.indexOf(row)) as [
		number,
		number,
		number
	];
	const topThreeCalories = topThree.reduce((sum, current) => sum + current, 0);

	return {
		maxCalories,
		maxIndex,
		topThreeCalories,
		topThreeIndexes,
	};
};
