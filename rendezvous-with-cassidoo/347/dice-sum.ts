type initCombo<
	dice extends number,
	res extends unknown[][] = [],
> = res['length'] extends dice ? res : initCombo<dice, [...res, [1]]>;

type updateCombo<
	sideCombo extends unknown[][],
	sides extends number,
> = sideCombo extends [
	...infer rest extends unknown[][],
	infer last extends unknown[],
]
	? last['length'] extends sides
		? [...updateCombo<rest, sides>, [1]]
		: [...rest, [...last, 1]]
	: [[1]];

type addCombo<
	sideCombo extends unknown[][],
	sum extends unknown[] = [],
> = sideCombo extends [
	infer first extends unknown[],
	...infer rest extends unknown[][],
]
	? addCombo<rest, [...sum, ...first]>
	: sum['length'];

type RollDice<
	dice extends number,
	sides extends number,
	sum extends number,
	sideCombo extends unknown[][] = initCombo<dice>,
	count extends unknown[] = [],
> = sideCombo[dice] extends unknown[]
	? count['length']
	: RollDice<
			dice,
			sides,
			sum,
			updateCombo<sideCombo, sides>,
			addCombo<sideCombo> extends sum ? [...count, 1] : count
		>;

const rollDice = (
	dice: number,
	sides: number,
	sum: number,
	curDie: number = 1,
	currSum: number = 0,
): number => {
	let count = 0;
	for (let side = 1; side <= sides; side++) {
		if (curDie === dice) {
			if (currSum + side === sum) count++;
			continue;
		} else {
			count += rollDice(dice, sides, sum, curDie + 1, currSum + side);
		}
	}
	return count;
};

export const diceSum = <
	Dice extends number,
	Sides extends number,
	Sum extends number,
>(
	dice: Dice,
	sides: Sides,
	sum: Sum,
): RollDice<Dice, Sides, Sum> => {
	return rollDice(dice, sides, sum) as never;
};
