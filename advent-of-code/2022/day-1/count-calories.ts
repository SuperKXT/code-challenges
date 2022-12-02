import { readFile } from 'fs/promises';
import path from 'path';

export interface CountCaloriesSolution {
	maxIndex: number,
	maxCalories: number,
	topThreeIndexes: [number, number, number],
	topThreeCalories: number,
}

export const countCalories = async (): Promise<CountCaloriesSolution> => {

	const input = await readFile(
		path.join(__dirname, 'input.txt'),
		'utf-8'
	);

	const calories = input.split('\n\n').map(row =>
		row.split('\n').map(Number).reduce(
			(sum, calories) => sum += calories
			, 0
		)
	);
	const maxCalories = Math.max(...calories);
	const maxIndex = calories.indexOf(maxCalories);

	const topThree = [...calories].sort((a, b) => b - a).slice(0, 3);
	const topThreeIndexes = topThree.map(row =>
		calories.indexOf(row)
	) as [number, number, number];
	const topThreeCalories = topThree.reduce(
		(sum, calories) => sum += calories
		, 0
	);

	return {
		maxIndex,
		maxCalories,
		topThreeIndexes,
		topThreeCalories,
	};

};
