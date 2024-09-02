type MaxPairs<Pairs extends Shoe[]> = number;

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
