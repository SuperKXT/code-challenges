import { countCalories } from './count-calories';

describe('testing countCalories', () => {
	it('should print the index and amount of the elf with most calories', async () => {
		const response = await countCalories();
		expect(response).toStrictEqual([229, 69626]);
	});
});
