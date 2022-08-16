export const parenthesisSubstring = (string: string): number => {

	let startParens: number = 0;
	let longest: number = 0;
	let currentLongest: number = 0;

	for (let i = 0; i < string.length; i++) {
		if (string[i] === '(') {
			startParens++;
		}
		else {
			if (startParens > 0) {
				currentLongest += 2;
				startParens--;
			}
			else {
				longest = Math.max(longest, currentLongest);
				currentLongest = 0;
			}
		}
		if ((i + 1) === string.length) {
			longest = Math.max(longest, currentLongest);
		}
	}

	return longest;

};