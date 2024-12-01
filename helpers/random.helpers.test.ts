import { getRandomInteger } from './random.helpers.js';

test('testing getRandomInteger helper', () => {
	const min = 0;
	const max = 100_000;
	for (let i = 0; i < 100_000; i++) {
		const val = getRandomInteger(min, max);
		expect(val).toBeGreaterThanOrEqual(min);
		expect(val).toBeLessThanOrEqual(max);
	}
});
