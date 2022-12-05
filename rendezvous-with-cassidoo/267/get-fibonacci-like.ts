// 🤬 noUncheckedIndexedAccess: can't live with it, can't live without it

export enum Errors {
	Length = 'Sequence length must be greater than 2',
	Undefined = 'Sequence can not have empty spots',
}

export const getFibonacciLike = (
	first: number,
	second: number,
	length: number
): number[] => {
	if (length < 3) {
		throw new Error(Errors.Length);
	}
	const sequence = [first, second];
	for (let index = 2; index < length; index++) {
		const first = sequence[index - 1];
		const second = sequence[index - 2];
		if (first === undefined || second === undefined) {
			throw new Error(Errors.Undefined);
		}
		sequence.push(first + second);
	}
	return sequence;
};

export const isFibonacciLike = (
	sequence: number[]
): boolean => {
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
