import { countCalories } from './count-calories';

import type { CountCaloriesSolution } from './count-calories';

describe('testing countCalories', () => {
	it('should print the index and amount of the elf with most calories', async () => {
		const response = await countCalories();
		const solution: CountCaloriesSolution = {
			maxIndex: 229,
			maxCalories: 69626,
			topThreeIndexes: [229, 178, 213],
			topThreeCalories: 206780,
		};
		expect(response).toStrictEqual(solution);
	});
});
