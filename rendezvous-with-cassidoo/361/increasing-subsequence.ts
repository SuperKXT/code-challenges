type IncreasingSubsequence<Arr extends number[]> = never;

export const increasingSubsequence = <Arr extends [number, ...number[]]>(
	array: Arr,
): IncreasingSubsequence<Arr> => {
	let longest = 0;
	let curr = 0;
	let last = Infinity;
	for (const num of array) {
		if (num > last) {
			curr++;
		} else {
			longest = Math.max(longest, curr);
			curr = 1;
		}
		last = num;
	}
	return longest as never;
};
