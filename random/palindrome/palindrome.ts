export const canBePalindrome = (string: string): boolean => {
	let hasOdd = false;
	const arr = Array.from(string.replace(/\s/g, '')).sort();
	for (let i = 0; i < arr.length; i++) {
		const curr = arr[i] as string;
		const end = arr.lastIndexOf(curr);
		const sub = arr.slice(i, end + 1);
		if (sub.length % 2 === 0) {
			i = end;
			continue;
		} else if (hasOdd) return false;
		else hasOdd = true;
	}
	return true;
};
