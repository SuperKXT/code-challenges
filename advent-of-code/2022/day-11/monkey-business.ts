interface Monkey {
	items: number[],
	operation: (item: number) => number,
	divisor: number,
	trueIndex: number,
	falseIndex: number,
	inspected: number,
}

interface Solution {
	monkeyBusiness: number,
	bigMb: number,
}

const prefix = {
	items: 'Starting items:',
	operation: 'Operation: new =',
	divisor: 'Test: divisible by',
	trueIndex: 'If true: throw to monkey',
	falseIndex: 'If false: throw to monkey',
};

export const monkeyBusiness = (
	input: string
): Solution => {

	const solution: Solution = {
		monkeyBusiness: 0,
		bigMb: 0,
	};

	const monkeys = input.split('\n\n').filter(Boolean).map(input => {

		const rows = input.split('\n');

		const [first, op, second] = rows[2]
			?.replace(prefix.operation, '')
			.trim()
			.split(/\s+/g) ?? [];

		const monkey: Monkey = {
			items: (rows[1]?.replace(prefix.items, '').split(',') ?? []).map(Number),
			operation: (item: number) => {
				const left = parseInt(first ?? '') || item;
				const right = parseInt(second ?? '') || item;
				if (op === '+') return left + right;
				else return left * right;
			},
			divisor: parseInt(rows[3]?.replace(prefix.divisor, '') ?? ''),
			trueIndex: parseInt(rows[4]?.replace(prefix.trueIndex, '') ?? ''),
			falseIndex: parseInt(rows[5]?.replace(prefix.falseIndex, '') ?? ''),
			inspected: 0,
		};

		return monkey;

	});

	const bigMonkeys = monkeys.slice().map(({ items, ...monkey }) => ({
		items: [...items],
		...monkey,
	}));

	const superModulo = bigMonkeys.reduce(
		(product, { divisor }) => product * divisor
		, 1
	);

	const executeCycle = (
		monkeys: Monkey[],
		isBig?: boolean
	) => {
		for (const monkey of monkeys) {
			const {
				items,
				operation,
				divisor,
				trueIndex,
				falseIndex,
			} = monkey;
			while (items.length) {
				const item = items.shift() as number;
				const newValue = (
					isBig
						? operation(item) % superModulo
						: Math.floor(operation(item) / 3)
				);
				const receiver = (
					newValue % divisor === 0
						? trueIndex
						: falseIndex
				);
				monkeys[receiver]?.items.push(newValue);
				monkey.inspected++;
			}
		}
	};

	for (let cycle = 1; cycle <= 20; cycle++) {
		executeCycle(monkeys);
	}

	for (let cycle = 1; cycle < 10000; cycle++) {
		executeCycle(bigMonkeys, true);
	}

	const topTwo = monkeys.sort((a, b) =>
		b.inspected - a.inspected
	).slice(0, 2);
	solution.monkeyBusiness = topTwo.reduce(
		(product, { inspected }) => product *= inspected
		, 1
	);

	const topTwoLong = bigMonkeys.sort((a, b) =>
		b.inspected - a.inspected
	).slice(0, 2);
	solution.bigMb = topTwoLong.reduce(
		(product, { inspected }) => product *= inspected
		, 1
	);

	return solution;

};
