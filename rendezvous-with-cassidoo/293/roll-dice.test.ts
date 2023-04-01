import { rollDice } from './roll-dice';

const TESTS = [
	{
		input: '4d4',
		min: 4,
		max: 16,
	},
	{
		input: '3d20',
		min: 3,
		max: 60,
	},
	{
		input: '1d8+2d10',
		min: 3,
		max: 28,
	},
	{
		input: '10d8+2d10+50d4',
		min: 62,
		max: 400,
	},
] as const;

test.each(TESTS)(
	'should return the result of die roll',
	({ input, min, max }) => {
		for (let i = 0; i < 500; i++) {
			const response = rollDice(input);
			expect(typeof response).toBe('number');
			expect(response).toBeGreaterThanOrEqual(min);
			expect(response).toBeLessThanOrEqual(max);
		}
	}
);

test('roll dice should throw an error for incorrect dice notation', () => {
	// @ts-expect-error type error
	expect(() => rollDice('2d')).toThrow('bad dice notation!');
});
