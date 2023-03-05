interface Monkey {
	items: number[];
	operation: (item: number) => number;
	divisor: number;
	trueIndex: number;
	falseIndex: number;
	inspected: number;
}

interface Solution {
	monkeyBusiness: number;
	bigMb: number;
}

const PREFIX = {
	divisor: 'Test: divisible by',
	falseIndex: 'If false: throw to monkey',
	items: 'Starting items:',
	operation: 'Operation: new =',
	trueIndex: 'If true: throw to monkey',
};

export const monkeyBusiness = (input: string): Solution => {
	const solution: Solution = {
		bigMb: 0,
		monkeyBusiness: 0,
	};

	const monkeys = input
		.split('\n\n')
		.filter(Boolean)
		.map((curr) => {
			const rows = curr.split('\n');

			const [first, op, second] =
				rows[2]?.replace(PREFIX.operation, '').trim().split(/\s+/gu) ?? [];

			const monkey: Monkey = {
				divisor: parseInt(rows[3]?.replace(PREFIX.divisor, '') ?? ''),
				falseIndex: parseInt(rows[5]?.replace(PREFIX.falseIndex, '') ?? ''),
				inspected: 0,
				items: (rows[1]?.replace(PREFIX.items, '').split(',') ?? []).map(
					Number
				),
				operation: (item: number) => {
					const left = parseInt(first ?? '') || item;
					const right = parseInt(second ?? '') || item;
					if (op === '+') return left + right;
					return left * right;
				},
				trueIndex: parseInt(rows[4]?.replace(PREFIX.trueIndex, '') ?? ''),
			};

			return monkey;
		});

	const bigMonkeys = monkeys.slice().map(({ items, ...monkey }) => ({
		items: [...items],
		...monkey,
	}));

	const superModulo = bigMonkeys.reduce(
		(product, { divisor }) => product * divisor,
		1
	);

	const executeCycle = (list: Monkey[], isBig?: boolean) => {
		for (const monkey of list) {
			const { items, operation, divisor, trueIndex, falseIndex } = monkey;
			while (items.length) {
				const item = items.shift() as number;
				const newValue =
					Math.floor(operation(item) / (isBig ? 1 : 3)) % superModulo;
				const receiver = newValue % divisor === 0 ? trueIndex : falseIndex;
				list[receiver]?.items.push(newValue);
				monkey.inspected++;
			}
		}
	};

	for (let cycle = 1; cycle <= 20; cycle++) executeCycle(monkeys);

	for (let cycle = 1; cycle <= 10000; cycle++) executeCycle(bigMonkeys, true);

	const topTwo = monkeys
		.sort((first, second) => second.inspected - first.inspected)
		.slice(0, 2);
	solution.monkeyBusiness = topTwo.reduce(
		(product, { inspected }) => product * inspected,
		1
	);

	const topTwoLong = bigMonkeys
		.sort((first, second) => second.inspected - first.inspected)
		.slice(0, 2);
	solution.bigMb = topTwoLong.reduce(
		(product, { inspected }) => product * inspected,
		1
	);

	return solution;
};
