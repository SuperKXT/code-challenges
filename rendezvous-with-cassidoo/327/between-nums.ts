const isPrime = (num: number) => {
	for (let i = 2; i < num; i++) if (num % i === 0) return false;
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
): number[] => {
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
	return result;
};
