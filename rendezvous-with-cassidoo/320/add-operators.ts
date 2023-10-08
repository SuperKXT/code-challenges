const operators = ['+', '-', '*', '/'] as const;

type Operator = (typeof operators)[number];

export type AddOperators<
	Source extends number,
	Target extends number,
> = string[];

type Result = { string: string; amount: number };

const digitOperate = (digits: string) => {
	const results: Result[] = [];

	for (const operator of operators) {
		const result: Result = {
			string: '',
			amount: operator === '+' || operator === '-' ? 0 : 1,
		};
		for (const digit of digits) {
			result.string += (result.string ? operator : '') + digit;
			switch (operator) {
				case '+':
					result.amount += Number(digit);
					break;
				case '-':
					result.amount -= Number(digit);
					break;
				case '*':
					result.amount *= Number(digit);
					break;
				case '/':
					result.amount /= Number(digit);
					break;
			}
		}
		results.push(result);
	}

	return results;
};

export const addOperators = <Source extends number, Target extends number>(
	source: Source,
	target: Target,
): AddOperators<Source, Target> => {
	const results = digitOperate(source.toString());
	return results
		.filter((row) => row.amount === target)
		.map((row) => row.string);
};
