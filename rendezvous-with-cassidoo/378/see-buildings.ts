type Fill<T extends number, A extends number[] = []> = A['length'] extends T
	? A
	: Fill<T, [...A, 1]>;

type Shift<T extends number[]> = T extends [
	unknown,
	...infer R extends number[],
]
	? R
	: never;

type NumberToArray<
	T extends number,
	R extends string = `${T}`,
	A extends number[] = [],
> = R extends `${infer F extends number}${infer L}`
	? NumberToArray<T, L, [...A, F]>
	: A;

type GreaterThanDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = Fill<T[0]>,
	UF extends number[] = Fill<U[0]>,
> = T['length'] extends 0
	? false
	: T[0] extends U[0]
		? GreaterThanDigits<Shift<T>, Shift<U>>
		: UF[TF['length']] extends undefined
			? true
			: false;

type GreaterThan<
	T extends number,
	U extends number,
	TA extends number[] = NumberToArray<T>,
	UA extends number[] = NumberToArray<U>,
> = T extends U
	? false
	: TA['length'] extends UA['length']
		? GreaterThanDigits<TA, UA>
		: UA[TA['length']] extends undefined
			? true
			: false;

type SeeBuildings<
	Buildings extends number[],
	count extends 1[] = [],
	countWithCurr extends 1[] = [...count, 1],
> = Buildings extends [
	infer curr extends number,
	infer next extends number,
	...infer rest extends number[],
]
	? GreaterThan<curr, next> extends true
		? countWithCurr['length']
		: SeeBuildings<[next, ...rest], countWithCurr>
	: Buildings extends []
		? count['length']
		: countWithCurr['length'];

export const seeBuildings = <const Buildings extends [number, ...number[]]>(
	buildings: Buildings,
): SeeBuildings<Buildings> => {
	let count = 0;
	for (let idx = 0; idx < buildings.length; idx++) {
		const curr = buildings[idx] as number;
		const next = buildings[idx + 1] ?? Infinity;
		count++;
		if (next < curr) break;
	}
	return count as never;
};
