import type { Utils } from '~/types/utils.types.js';

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

type Max<
	T extends number,
	M extends number = 0,
	last extends number = Utils.lastInUnion<T> & number,
> = [T] extends [never]
	? M
	: Max<Exclude<T, last>, GreaterThan<last, M> extends true ? last : M>;

export type DepthJson<
	T,
	Depth extends number = 0,
	Tup extends unknown[] = Utils.tuple<Depth>,
	NextDepth extends number = [...Tup, 1]['length'],
> = T extends object
	? Max<
			| NextDepth
			| {
					[k in Exclude<keyof T, keyof unknown[]>]: DepthJson<T[k], NextDepth>;
			  }[Exclude<keyof T, keyof unknown[]>]
	  >
	: Depth;

export const depthJson = <const T>(json: T): DepthJson<T> => {
	try {
		let maxDepth = 0;
		const curr: { stack: string[]; depth: number } = { stack: [], depth: 0 };
		for (const char of JSON.stringify(json)) {
			if (['[', '{'].includes(char)) {
				curr.stack.push(char);
				curr.depth++;
			} else if ([']', '}'].includes(char)) {
				curr.stack.pop();
				maxDepth = Math.max(maxDepth, curr.depth);
				curr.depth--;
			}
		}
		return maxDepth as never;
	} catch {
		return 0 as never;
	}
};
