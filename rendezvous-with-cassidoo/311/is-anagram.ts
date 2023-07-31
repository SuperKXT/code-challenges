export const isAnagram = <T extends string, U extends string>(
	first: T,
	second: U,
): boolean => {
	if (first.length !== second.length) return false;
	const firstArray = Array.from(first.toLowerCase()).sort();
	const secondArray = Array.from(second.toLowerCase()).sort();
	return firstArray.join('') === secondArray.join('');
};
