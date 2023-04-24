import { divisibleIntegers } from './divisible-integers';

interface Test {
	input: number[];
	outputs: RepeatedTuple<boolean, 9>;
}

const tests: Test[] = [
	{
		input: [40, 50, 90],
		outputs: [true, true, true, true, true, true, false, true, true],
	},
];

test.each(tests)(
	'should return the if the number is divisible to given array digits',
	async ({ input, outputs }) => {
		for (let idx = 0; idx < outputs.length; idx++) {
			const response = divisibleIntegers((idx + 1) as any, input);
			expect(response).toBe(outputs[idx]);
		}
	}
);
