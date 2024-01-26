import { objectKeys } from '../../helpers/object.helpers.js';

const cardIdMap = {
	Mastercard: [51, 52, 53, 54, 55],
	Visa: [4],
} as const;

type CardIdMap = typeof cardIdMap;

type tuple<
	T extends number,
	result extends 1[] = [],
> = result['length'] extends T ? result : tuple<T, [...result, 1]>;

type numberToTuple<
	T extends number,
	str extends string = `${T}`,
> = str extends `${infer first}${infer rest}`
	? first extends `${infer num extends number}`
		? [num, ...numberToTuple<never, rest>]
		: never
	: [];

type doubleNum<T extends number> = [...tuple<T>, ...tuple<T>]['length'] &
	number;

type sumDigit<
	T extends number,
	digits extends string = `${T}`,
> = digits extends `${infer first extends number}${infer rest}`
	? [...tuple<first>, ...sumDigit<never, rest>]
	: [];

type sumPayload<
	T extends number[],
	double extends boolean = true,
	sum extends 1[] = [],
> = T extends [...infer rest extends number[], infer last extends number]
	? sumPayload<
			rest,
			double extends true ? false : true,
			[...sum, ...sumDigit<double extends true ? doubleNum<last> : last>]
		>
	: sum['length'];

type mod<
	T extends number,
	M extends number,
	tTuple extends 1[] = tuple<T>,
	mTuple extends 1[] = tuple<M>,
> = tTuple extends [...mTuple, ...infer rest extends 1[]]
	? mod<never, never, rest, mTuple>
	: tTuple['length'];

type subtract<T extends number, M extends number> =
	tuple<T> extends [...tuple<M>, ...infer rest extends 1[]]
		? rest['length']
		: 0;

type verifyLuhn<T extends number> =
	numberToTuple<T> extends [
		...infer payload extends number[],
		infer check extends number,
	]
		? subtract<
				10,
				mod<sumPayload<payload>, 10> extends infer m extends number
					? m extends 0
						? 10
						: m
					: 0
			> extends check
			? true
			: false
		: false;

type startsWith<T extends string, S extends string> = T extends `${S}${string}`
	? true
	: false;

type checkBrandTuple<
	T extends readonly number[],
	U extends number,
> = T extends readonly [
	infer first extends number,
	...infer rest extends number[],
]
	? startsWith<`${U}`, `${first}`> extends true
		? true
		: checkBrandTuple<rest, U>
	: false;

type brand<T extends number> = {
	[k in keyof CardIdMap]: checkBrandTuple<CardIdMap[k], T> extends true
		? k
		: never;
}[keyof CardIdMap] extends infer b
	? [b] extends [never]
		? 'Other'
		: b
	: never;

type LuhnCheck<T extends number> =
	verifyLuhn<T> extends true
		? { valid: true; brand: brand<T> }
		: { valid: false };

export const luhnCheck = <T extends number>(number: T): LuhnCheck<T> => {
	const sum = String(Math.floor(number / 10))
		.split('')
		.reverse()
		.reduce((acc, curr, i) => {
			const value = Number(curr) * ((i + 1) % 2 === 0 ? 1 : 2);
			const digitSum = String(value)
				.split('')
				.reduce((acc2, digit) => acc2 + Number(digit), 0);
			return acc + digitSum;
		}, 0);
	const check = number % 10;
	const valid = 10 - (sum % 10 || 10) === check;
	if (!valid) return { valid: false } as never;
	const brand =
		objectKeys(cardIdMap).find((key) =>
			cardIdMap[key].some((id) => String(number).startsWith(String(id))),
		) ?? 'Other';
	return { valid: true, brand } as never;
};
