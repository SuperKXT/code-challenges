/* eslint-disable no-param-reassign */
type Task = { name: string; duration: number };

type tuple<
	size extends number,
	tup extends 1[] = [],
> = tup['length'] extends size ? tup : tuple<size, [...tup, 1]>;

type numberToTuple<
	T extends number,
	R extends string = `${T}`,
	A extends number[] = [],
> = R extends `${infer F extends number}${infer L}`
	? numberToTuple<T, L, [...A, F]>
	: A;

type removeFromTuple<
	tup extends unknown[],
	toRemove extends number,
	idx extends 1[] = [],
> = idx['length'] extends toRemove
	? tup
	: tup extends [unknown, ...infer rest]
	? removeFromTuple<rest, toRemove, [...idx, 1]>
	: [];

type greaterThanDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = tuple<T[0]>,
	UF extends number[] = tuple<U[0]>,
> = T['length'] extends 0
	? false
	: T[0] extends U[0]
	? greaterThanDigits<removeFromTuple<T, 1>, removeFromTuple<U, 1>>
	: UF[TF['length']] extends undefined
	? true
	: false;

type greaterThan<
	T extends number,
	U extends number,
	TA extends number[] = numberToTuple<T>,
	UA extends number[] = numberToTuple<U>,
> = T extends U
	? false
	: TA['length'] extends UA['length']
	? greaterThanDigits<TA, UA>
	: UA[TA['length']] extends undefined
	? true
	: false;

type includes<tup extends unknown[], val> = tup extends [
	infer first,
	...infer rest,
]
	? first extends val
		? true
		: includes<rest, val>
	: false;

type minDurationTask<
	tasks extends readonly Task[],
	names extends string[],
	min extends Task | undefined = undefined,
> = tasks extends readonly [
	infer first extends Task,
	...infer rest extends Task[],
]
	? includes<names, first['name']> extends true
		? minDurationTask<rest, names, min>
		: minDurationTask<
				rest,
				names,
				min extends Task
					? greaterThan<min['duration'], first['duration']> extends false
						? min
						: first
					: first
		  >
	: min;

type sortNames<
	tasks extends readonly Task[],
	names extends string[],
> = tasks extends readonly [
	infer first extends Task,
	...infer rest extends Task[],
]
	? includes<names, first['name']> extends true
		? [first['name'], ...sortNames<rest, names>]
		: sortNames<rest, names>
	: [];

type DoWork<
	tasks extends readonly Task[],
	time extends number,
	timeTup extends 1[] = tuple<time>,
	names extends string[] = [],
	minTask extends Task | undefined = minDurationTask<tasks, names>,
> = timeTup extends []
	? sortNames<tasks, names>
	: minTask extends Task
	? DoWork<
			tasks,
			time,
			removeFromTuple<timeTup, minTask['duration']>,
			[...names, minTask['name']]
	  >
	: sortNames<tasks, names>;

export const doWork = <
	const Tasks extends readonly Task[],
	Time extends number,
>(
	tasks: Tasks,
	time: Time,
): DoWork<Tasks, Time> => {
	const names: string[] = [];
	if (!tasks.length) return [] as never;
	while (time > 0) {
		const current = tasks.reduce((min, curr) =>
			min.duration < curr.duration ? min : curr,
		);
		if (time < current.duration) break;
		time = (time - current.duration) as never;
		current.duration = Infinity;
		names[tasks.indexOf(current)] = current.name;
	}
	return names.filter(Boolean) as never;
};
