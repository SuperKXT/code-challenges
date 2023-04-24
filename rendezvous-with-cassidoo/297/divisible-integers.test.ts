import { divisibleIntegers } from './divisible-integers';

interface Test {
	input: [number, number[]],
	output: boolean,
}

const tests: Test[] = [
	{
    input: [3, [40, 50, 90]],
    output: false,
  },
]

test.each(tests)('should return the if the number is divisible to given array digits', async ({ input, output }) => {
	const response = await divisibleIntegers(...input);
	expect(response).toBe(output);
});
