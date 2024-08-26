type EqualLetterAndDigits<Logs extends string> = string;

type SubStr = {
	string: string;
	num: number;
	letter: number;
};

const isEqual = (curr: string) => {
	const letters = curr.replace(/\d/gu, '').length;
	const nums = curr.length - letters;
	return nums === letters;
};

export const equalLetterAndDigits = <const Str extends string>(
	str: Str,
): EqualLetterAndDigits<Str> => {
	for (let i = 0; i < str.length; i++) {
		const forward = str.slice(i);
		if (isEqual(forward)) return forward as never;
		const backward = str.slice(0, str.length - i);
		if (isEqual(backward)) return backward as never;
	}
	return '' as never;
};
