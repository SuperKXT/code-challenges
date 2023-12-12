type tuple<
	size extends number,
	res extends 1[] = [],
> = res['length'] extends size ? res : tuple<size, [...res, 1]>;

type isEven<T extends number> = never;

type Majority<
	input extends number[],
	idx extends 1[] = [],
	rotated extends 1[] = [],
> = number | 'evens' | 'odds' | 'none';

export const majority = <const Input extends number[]>(
	input: Input,
): Majority<Input> => {
	let curr = { num: Infinity, count: 0 };
	let mostCount = 0;
	let winner: undefined | number = undefined;
	const count = { even: 0, odd: 0 };
	for (const num of input.sort((a, b) => a - b)) {
		count[num % 2 === 0 ? 'even' : 'odd']++;
		if (curr.num !== num) {
			if (mostCount < curr.count) {
				mostCount = curr.count;
				winner = curr.num;
			} else if (mostCount === curr.count) {
				winner = undefined;
			}
			curr = { num, count: 1 };
		} else {
			curr.count++;
		}
	}
	if (winner) return winner;
	if (count.even === count.odd) return 'none';
	return count.even > count.odd ? 'evens' : 'odds';
};
