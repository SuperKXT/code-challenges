type Reverse<A extends string | number | bigint> =
	`${A}` extends `${infer AH}${infer AT extends string | number | bigint}`
		? `${Reverse<AT>}${AH}`
		: `${A}`;

type DigsNext = {
	0: 1;
	1: 2;
	2: 3;
	3: 4;
	4: 5;
	5: 6;
	6: 7;
	7: 8;
	8: 9;
};

type DigsPrev = { [K in keyof DigsNext as DigsNext[K]]: K };

type AddOne<A extends string> = A extends `${infer AH extends
	number}${infer AT}`
	? AH extends 9
		? `0${AddOne<AT>}`
		: AH extends keyof DigsNext
			? `${DigsNext[AH]}${AT}`
			: never
	: `1`;

type SubOne<A> = A extends `${infer AH extends number}${infer AT}`
	? AH extends 0
		? `9${SubOne<AT>}`
		: AH extends keyof DigsPrev
			? `${DigsPrev[AH]}${AT}`
			: never
	: never;

type Add<
	A extends string,
	B extends string,
> = A extends `${infer AH}${infer AT}`
	? B extends `${infer BH}${infer BT}`
		? BH extends "0"
			? `${AH}${Add<AT, BT>}`
			: Add<AddOne<A>, SubOne<B>>
		: A
	: B;

type ToNum<Str extends string> = Str extends `${infer N extends number}`
	? N
	: never;

type Multiply<
	A extends string,
	B extends string,
	R extends string = "0",
> = A extends "0"
	? R
	: B extends "0"
		? R
		: A extends `${infer AH}${infer AT}`
			? AH extends "0"
				? Multiply<AT, `0${B}`, R>
				: Multiply<SubOne<A>, B, Add<R, B>>
			: R;

type Squares<
	Num extends number,
	Idx extends unknown[] = [1],
	Res extends string = "0",
> = Idx[Num] extends 1
	? ToNum<Reverse<Res>>
	: Squares<
			Num,
			[...Idx, 1],
			Add<Res, Multiply<Reverse<Idx["length"]>, Reverse<Idx["length"]>>>
		>;

export const squares = <const Num extends number>(num: Num): Squares<Num> => {
	let res = 0;
	for (let i = 1; i <= num; i++) {
		res += i ** 2;
	}
	return res as never;
};
