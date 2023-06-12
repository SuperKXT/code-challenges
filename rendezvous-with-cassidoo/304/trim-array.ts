type tuple<T extends number, R extends any[] = []> = R['length'] extends T
	? R
	: tuple<T, [...R, any]>;

type TrimArray<
	Arr extends readonly number[],
	Start extends number,
	End extends number
> = Arr extends readonly [...tuple<Start>, ...infer Rest, ...tuple<End>]
	? Rest
	: [];

export const trimArray = <
	const Arr extends readonly number[],
	Start extends number,
	End extends number
>(
	array: Arr,
	start: Start,
	end: End
): TrimArray<Arr, Start, End> => {
	return array.slice(start, array.length - end) as never;
};
