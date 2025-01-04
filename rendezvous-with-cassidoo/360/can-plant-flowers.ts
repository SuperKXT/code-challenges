type Tuple<
	size extends number,
	res extends 1[] = [],
> = res["length"] extends size ? res : Tuple<size, [...res, 1]>;

type Flag = 0 | 1;

type CanPlantFlowers<
	Line extends Flag[],
	ToAdd extends number,
	remaining extends unknown[] = Tuple<ToAdd>,
	prev extends Flag = 0,
> = remaining extends [unknown, ...infer newRemaining]
	? Line extends [
			infer curr extends Flag,
			infer next extends Flag,
			...infer rest extends Flag[],
		]
		? [prev, curr, next] extends [0, 0, 0]
			? CanPlantFlowers<[next, ...rest], ToAdd, newRemaining, 1>
			: CanPlantFlowers<[next, ...rest], ToAdd, remaining, curr>
		: Line extends [infer curr extends 0]
			? CanPlantFlowers<[], ToAdd, newRemaining, curr>
			: false
	: true;

export const canPlantFlowers = <
	Line extends [Flag, ...Flag[]],
	ToAdd extends number,
>(
	line: Line,
	toAdd: ToAdd,
): CanPlantFlowers<Line, ToAdd> => {
	let remaining = toAdd;
	for (let idx = 0; idx < line.length; idx++) {
		if (!remaining) break;
		const curr = line[idx];
		const last = line[idx - 1];
		const next = line[idx + 1];
		if (!curr && !last && !next) {
			remaining--;
			line[idx] = 1;
		}
	}
	return !remaining as never;
};
