import { fromTo } from './from-to';

interface Test {
	min: number;
	max: number;
}

const tests: Test[] = [
	{ min: 5, max: 7 },
	{ min: 1, max: 10 },
	{ min: 100, max: 150 },
	{ min: 10_080, max: 11_000 },
	{ min: 1, max: 0 },
];

describe('testing fromTo', () => {
	it.each(tests)('generate the numbers in the given range', (test) => {
		const generator = fromTo(test.min, test.max);
		for (let index = test.min; index <= test.max; index++) {
			expect(index).toBe(generator());
		}
		expect(generator()).toBeUndefined();
	});
});
