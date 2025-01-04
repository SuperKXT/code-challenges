type tuple<T extends number, A extends 1[] = []> = A["length"] extends T
	? A
	: tuple<T, [...A, 1]>;

type shift<tup extends number[]> = tup extends [
	unknown,
	...infer rest extends number[],
]
	? rest
	: never;

type numberToTuple<
	num extends number,
	str extends string = `${num}`,
	result extends number[] = [],
> = str extends `${infer F extends number}${infer L}`
	? numberToTuple<num, L, [...result, F]>
	: result;

type greaterThanDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = tuple<T[0]>,
	UF extends number[] = tuple<U[0]>,
> = T["length"] extends 0
	? false
	: T[0] extends U[0]
		? greaterThanDigits<shift<T>, shift<U>>
		: UF[TF["length"]] extends undefined
			? true
			: false;

type greaterThan<
	T extends number,
	U extends number,
	TA extends number[] = numberToTuple<T>,
	UA extends number[] = numberToTuple<U>,
> = T extends U
	? false
	: TA["length"] extends UA["length"]
		? greaterThanDigits<TA, UA>
		: UA[TA["length"]] extends undefined
			? true
			: false;

type lessThan<T extends number, U extends number> = T extends U
	? false
	: greaterThan<T, U> extends true
		? false
		: true;

type IsBitonic<
	input extends number[],
	increased extends boolean = false,
	peak extends number = never,
	idx extends 1[] = [],
	curr extends number = input[idx["length"]],
	next extends number = input[[...idx, 1]["length"]],
> = next extends undefined
	? [peak] extends [never]
		? false
		: increased extends false
			? false
			: peak
	: greaterThan<curr, next> extends true
		? increased extends false
			? false
			: IsBitonic<
					input,
					increased,
					[peak] extends [never] ? curr : peak,
					[...idx, 1]
				>
		: lessThan<curr, next> extends true
			? [peak] extends [never]
				? IsBitonic<input, true, peak, [...idx, 1]>
				: false
			: IsBitonic<input, increased, peak, [...idx, 1]>;

export const isBitonic = <const Input extends number[]>(
	input: Input,
): IsBitonic<Input> => {
	let increased = false;
	let peak: number | undefined = undefined;
	for (let i = 0; i < input.length - 1; i++) {
		const curr = input[i] as number;
		const next = input[i + 1] as number;
		if (curr > next) {
			if (!increased) return false as never;
			if (!peak) peak = curr;
		} else if (curr < next) {
			increased = true;
			if (peak) return false as never;
		}
	}
	if (!increased || !peak) return false as never;
	return peak as never;
};
