type tuple<num extends number, tup extends 1[] = []> = tup['length'] extends num
	? tup
	: tuple<num, [...tup, 1]>;

type removeN<
	tup extends 1[],
	n extends number,
	idx extends 1[] = [],
> = idx['length'] extends n
	? tup
	: tup extends [1, ...infer rest extends 1[]]
	  ? removeN<rest, n, [...idx, 1]>
	  : [];

type divisible<
	num extends number,
	by extends number,
	tup extends 1[] = tuple<num>,
	idx extends 1[] = [],
> = tup extends []
	? true
	: [...tup, 1][by] extends undefined
	  ? false
	  : divisible<never, by, removeN<tup, by>, [...idx, 1]>;

type IsPrime<num extends number, idx extends 1[] = [1, 1]> = num extends 0
	? false
	: num extends 1
	  ? true
	  : idx['length'] extends num
	    ? true
	    : divisible<num, idx['length']> extends true
	      ? false
	      : IsPrime<num, [...idx, 1]>;

type IsOdd<
	num extends number,
	tup extends unknown[] = tuple<num>,
> = tup extends [unknown, unknown, ...infer rest]
	? IsOdd<never, rest>
	: tup['length'] extends 1
	  ? true
	  : false;

type IsEven<num extends number> = IsOdd<num> extends true ? false : true;

type checkNum<
	num extends number,
	check extends 'even' | 'odd' | 'prime',
> = check extends 'even'
	? IsEven<num>
	: check extends 'odd'
	  ? IsOdd<num>
	  : IsPrime<num>;

type BetweenNums<
	first extends number,
	second extends number,
	check extends 'even' | 'odd' | 'prime',
	firstTup extends 1[] = tuple<first>,
	secondTup extends 1[] = tuple<second>,
	start extends 1[] = firstTup[secondTup['length']] extends 1
		? secondTup
		: firstTup,
	end extends 1[] = firstTup[secondTup['length']] extends 1
		? firstTup
		: secondTup,
	idx extends 1[] = [1],
	result extends number[] = [],
	curr extends number = [...start, ...idx]['length'],
> = curr extends end['length']
	? result
	: BetweenNums<
			never,
			never,
			check,
			never,
			never,
			start,
			end,
			[...idx, 1],
			[...result, ...(checkNum<curr, check> extends true ? [curr] : [])]
	  >;

const isPrime = (num: number) => {
	for (let i = 2; i < Math.sqrt(num); i += 2) if (num % i === 0) return false;
	return true;
};

export const betweenNums = <
	First extends number,
	Second extends number,
	Check extends 'even' | 'odd' | 'prime',
>(
	first: First,
	second: Second,
	check: Check,
): BetweenNums<First, Second, Check> => {
	const result: number[] = [];
	for (let i = Math.min(first, second) + 1; i < Math.max(first, second); i++) {
		switch (check) {
			case 'even':
				if (i % 2 === 0) result.push(i);
				break;
			case 'odd':
				if (i % 2 !== 0) result.push(i);
				break;
			case 'prime':
				if (isPrime(i)) result.push(i);
				break;
		}
	}
	return result as never;
};
