export type AddOperators<
	Source extends number,
	Target extends number,
> = string[];

type Result = { result: string; sum: number };
type ResultCombo = { '+': Result; '-': Result; '*': Result; '/': Result };

export const addOperators = <Source extends number, Target extends number>(
	source: Source,
	target: Target,
): AddOperators<Source, Target> => {
	return [];
};
