import { caloriesCost } from './calories-cost.js';

test('testing caloriesCost against test 1', () => {
	const calories = [200, 400, 600, 800];
	const prices = [50, 60, 80, 100];
	const dailyGoal = 1200;

	const result = caloriesCost(calories, prices, dailyGoal);
	const expected = 160;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});
