/* eslint-disable no-param-reassign */
type tuple<Len extends number, tup extends 1[] = []> = tup['length'] extends Len
	? tup
	: tuple<Len, [...tup, 1]>;

type stringToTuple<T extends string> = T extends `${infer first}${infer rest}`
	? [first, ...stringToTuple<rest>]
	: [];

type removeOne<T extends unknown[]> = T extends [unknown, ...infer rest]
	? rest
	: [];

export type KPal<
	str extends string,
	canRemove extends number,
	strTup extends string[] = stringToTuple<str>,
	removeTup extends 1[] = tuple<canRemove>,
> = strTup extends [
	infer first extends string,
	...infer rest extends string[],
	infer last extends string,
]
	? first extends last
		? KPal<never, never, rest, removeTup>
		: removeTup['length'] extends 0
			? false
			: KPal<never, never, [...rest, last], removeOne<removeTup>>
	: true;

export const kPal = <Str extends string, CanRemove extends number>(
	str: Str,
	canRemove: CanRemove,
): KPal<Str, CanRemove> => {
	while (str.length > 1) {
		const first = str.at(0) as string;
		const last = str.at(-1) as string;
		if (first === last) {
			str = str.substring(1, str.length - 1) as Str;
			continue;
		} else if (!canRemove) {
			return false as never;
		}
		canRemove--;
		str = str.substring(1) as Str;
	}
	return true as never;
};
