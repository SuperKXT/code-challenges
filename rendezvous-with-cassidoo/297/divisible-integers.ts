export type DivisibleIntegerN = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const isEven = (digit: number) => digit % 2 === 0;
const isOdd = (digit: number) => !isEven(digit);
const isDivisibleBy2 = (digits: number[]) => digits.some(isEven);
const isDivisibleBy3 = (digits: number[]) =>
	digits.reduce((acc, digit) => acc + digit) % 3 === 0;

const permutations = (digits: number[]) => {
	const result: number[] = [];
	const permute = (arr: number[], m: number[] = []) => {
		if (!arr.length) {
			result.push(Number(m.join("")));
			return;
		}
		for (let idx = 0; idx < arr.length; idx++) {
			const curr = arr.slice();
			const next = curr.splice(idx, 1);
			permute(curr, m.concat(next));
		}
	};
	permute(digits);
	return result;
};

export const divisibleIntegers = (
	n: DivisibleIntegerN,
	array: number[],
): boolean => {
	const digits = array.map((row) => String(row).split("").map(Number)).flat();
	switch (n) {
		case 1:
			return true;
		case 2:
			return isDivisibleBy2(digits);
		case 3:
			return isDivisibleBy3(digits);
		case 4:
			return digits.some((digit, idx, arr) => {
				const rest = arr.splice(idx, 1);
				return (
					([0, 4, 8].includes(digit) && (!rest.length || rest.some(isEven))) ||
					([2, 6].includes(digit) && rest.some(isOdd))
				);
			});
		case 5:
			return digits.some((digit) => digit === 0 || digit === 5);
		case 6:
			return isDivisibleBy2(digits) && isDivisibleBy3(digits);
		case 7:
			return digits.some(
				(digit, idx, arr) =>
					2 * digit -
						(arr.splice(idx, 1).reduce((acc, curr) => acc + curr) % 7) ===
					0,
			);
		case 8:
			return permutations(digits).some((digit) => (digit % 1000) % 8 === 0);
		case 9:
			return digits.reduce((acc, num) => acc + num) % 3 === 0;
	}
};
