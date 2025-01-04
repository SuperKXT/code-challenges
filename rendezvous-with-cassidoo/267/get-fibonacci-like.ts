// 🤬 noUncheckedIndexedAccess: can't live with it, can't live without it

export const ERRORS = {
	length: "Sequence length must be greater than 2",
	undefined: "Sequence can not have empty spots",
} as const;

export const getFibonacciLike = (
	first: number,
	second: number,
	length: number,
): number[] => {
	if (length < 3) throw new Error(ERRORS.length);

	const sequence = [first, second];
	for (let index = 2; index < length; index++) {
		const current = sequence[index - 1];
		const last = sequence[index - 2];
		if (current === undefined || last === undefined)
			throw new Error(ERRORS.undefined);

		sequence.push(current + last);
	}
	return sequence;
};

export const isFibonacciLike = (sequence: number[]): boolean => {
	if (sequence.length < 3) return false;

	return sequence.every((value, index, array) => {
		if (index < 2) return true;

		const first = array[index - 1];
		const second = array[index - 2];
		if (first === undefined || second === undefined) return false;

		if (isNaN(first + second)) return isNaN(value);

		return first + second === value;
	});
};
