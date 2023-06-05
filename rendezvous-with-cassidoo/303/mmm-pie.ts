type person = {
	name: string;
	num: number;
};

type tuple<T extends number, R extends 1[] = []> = R['length'] extends T
	? R
	: tuple<T, [...R, 1]>;

type requiredPieces<
	T extends readonly person[],
	result extends any[] = []
> = T extends readonly [infer F extends person, ...infer R extends person[]]
	? requiredPieces<R, [...result, ...tuple<F['num']>]>
	: result;

type MmmPie<
	People extends readonly Readonly<person>[],
	Pieces extends number,
	PiecesTuple extends any[] = tuple<Pieces>,
	RequiredTuple extends any[] = requiredPieces<People>,
	Result extends any[] = []
> = RequiredTuple extends [...PiecesTuple, ...infer R]
	? MmmPie<never, never, PiecesTuple, R, [...Result, 1]>
	: RequiredTuple extends []
	? Result['length']
	: [...Result, 1]['length'];

const _people = [
	{ name: 'Joe', num: 9 },
	{ name: 'Cami', num: 3 },
	{ name: 'Cassidy', num: 4 },
] as const;

type _ = MmmPie<typeof _people, 8>;
//   ^?;

export const mmmPie = <
	const People extends readonly person[],
	Pieces extends number
>(
	people: People,
	pieces: Pieces
): MmmPie<People, Pieces> => {
	const requiredPieces = people.reduce((acc, curr) => acc + curr.num, 0);
	return Math.ceil(requiredPieces / pieces) as never;
};
