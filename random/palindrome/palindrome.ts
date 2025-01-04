export const canBePalindrome = (string: string): boolean => {
	let hasOdd = false;
	const arr = Array.from(string.replace(/\s/gu, "")).sort();
	for (let index = 0; index < arr.length; index++) {
		const curr = arr[index] as string;
		const end = arr.lastIndexOf(curr);
		const sub = arr.slice(index, end + 1);
		if (sub.length % 2 === 0) {
			index = end;
			continue;
		} else if (hasOdd) {
			return false;
		} else {
			hasOdd = true;
		}
	}
	return true;
};
