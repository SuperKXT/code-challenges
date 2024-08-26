type IsNum<Str extends string> = Str extends `${number}` ? true : false;

type IsEqual<
	Str extends string,
	NumCount extends 1[] = [],
	CharCount extends 1[] = [],
> = Str extends `${infer first}${infer rest}`
	? IsEqual<
			rest,
			IsNum<first> extends true ? [...NumCount, 1] : NumCount,
			IsNum<first> extends true ? CharCount : [...CharCount, 1]
		>
	: NumCount['length'] extends CharCount['length']
		? true
		: false;

type RemoveFirst<Str extends string> = Str extends `${string}${infer rest}`
	? rest
	: '';
type RemoveLast<Str extends string> =
	Str extends `${infer first}${infer second}${infer rest}`
		? `${first}${RemoveLast<`${second}${rest}`>}`
		: '';

type EqualLetterAndDigits<
	Forward extends string,
	Backward extends string = Forward,
> =
	IsEqual<Forward> extends true
		? Forward
		: IsEqual<Backward> extends true
			? Backward
			: EqualLetterAndDigits<RemoveFirst<Forward>, RemoveLast<Backward>>;

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
