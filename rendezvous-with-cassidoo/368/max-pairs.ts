type FindPair<T extends Shoe> = T extends `${infer foot}-${infer size}`
	? `${foot extends 'L' ? 'R' : 'L'}-${size}`
	: never;

type MaxPairs<
	Pairs extends Shoe[],
	Found extends Record<Shoe, 1[]> = {},
	Count extends 1[] = [],
> = Pairs extends [infer curr extends Shoe, ...infer rest extends Shoe[]]
	? Found[FindPair<curr>] extends [number, ...infer restPairs extends 1[]]
		? MaxPairs<
				rest,
				{ [k in keyof Found]: FindPair<curr> extends k ? restPairs : Found[k] },
				[...Count, 1]
			>
		: MaxPairs<
				rest,
				Omit<Found, curr> & {
					[k in curr]: Found[k] extends 1[] ? [1, ...Found[k]] : [1];
				},
				Count
			>
	: Count['length'];

type Foot = 'L' | 'R';
type Shoe = `${Foot}-${number}`;

export const maxPairs = <const Pairs extends [Shoe, ...Shoe[]]>(
	pairs: Pairs,
): MaxPairs<Pairs> => {
	let count = 0;
	const found = new Map<Shoe, number>();
	for (const shoe of pairs) {
		const [foot, size] = shoe.split('-') as [Foot, number];
		const pair: Shoe = `${foot === 'L' ? 'R' : 'L'}-${size}`;
		const pairCount = found.get(pair) ?? 0;
		if (pairCount) {
			found.set(pair, pairCount - 1);
			count++;
		} else {
			found.set(shoe, (found.get(shoe) ?? 0) + 1);
		}
	}
	return count as never;
};
