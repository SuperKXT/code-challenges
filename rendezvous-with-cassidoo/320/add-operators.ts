const operators = ['+', '-', '*', '/'] as const;

type Result = { string: string; amount: number };

const digitOperate = (
	[first, ...rest]: string[],
	string: string = '',
	amount?: number,
): Result[] => {
	const results: Result[] = [];
	if (!first) return [];
	if (amount === undefined) {
		results.push(...digitOperate(rest, first, Number(first)));
	} else {
		for (const operator of operators) {
			let nextAmount = amount;
			const nextString = string + (string ? operator : '') + first;
			switch (operator) {
				case '+':
					nextAmount += Number(first);
					break;
				case '-':
					nextAmount -= Number(first);
					break;
				case '*':
					nextAmount *= Number(first);
					break;
				case '/':
					nextAmount /= Number(first);
					break;
			}
			if (rest.length)
				results.push(...digitOperate(rest, nextString, nextAmount));
			else results.push({ string: nextString, amount: nextAmount });
		}
	}

	return results;
};

export const addOperators = (source: number, target: number) => {
	const results = digitOperate(Array.from(source.toString()));
	return results
		.filter((row) => row.amount === target)
		.map((row) => row.string);
};
