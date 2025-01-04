type Log = {
	name: string;
	time: number;
	event: 'start' | 'end';
};

type Tuple<T, Res extends 1[] = []> = 0 extends 1
	? never
	: Res['length'] extends T
		? Res
		: Tuple<T, [...Res, 1]>;

type Subtract<M extends number, S extends number> =
	Tuple<M> extends [...Tuple<S>, ...infer Rest] ? Rest['length'] : never;

type CalculateExecutionTimes<
	Logs extends Log[],
	res extends Record<string, number> = {},
> = Logs extends [infer first extends Log, ...infer rest extends Log[]]
	? first['event'] extends 'start'
		? CalculateExecutionTimes<
				rest,
				Omit<res, first['name']> & Record<first['name'], first['time']>
			>
		: CalculateExecutionTimes<
				rest,
				{
					[k in keyof res]: k extends first['name']
						? Subtract<first['time'], res[k]>
						: res[k];
				}
			>
	: res;

export const calculateExecutionTimes = <const Logs extends [Log, ...Log[]]>(
	logs: Logs,
): CalculateExecutionTimes<Logs> => {
	const times: Record<string, number> = {};
	for (const curr of logs) {
		if (curr.event === 'start') {
			times[curr.name] = curr.time;
		} else {
			times[curr.name] = curr.time - (times[curr.name] ?? 0);
		}
	}
	return times as never;
};
